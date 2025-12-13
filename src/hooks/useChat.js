// ==================== src/hooks/useChat.js ====================
import { useState, useEffect, useCallback } from 'react';
import { sendMessage as sendMessageToAI } from '../services/anthropic';
import { saveChatHistory, getChatHistory } from '../services/api';
import { trackChatMessage, trackCodeGeneration } from '../services/tracking';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('general');
  const [error, setError] = useState(null);

  // Load chat history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const history = await getChatHistory();
      setMessages(history);
    } catch (err) {
      console.error('Error loading history:', err);
    }
  };

  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      // Get user ID
      const userId = localStorage.getItem('current_user_id') || 'anonymous';
      
      // Track the chat message
      trackChatMessage(userId, {
        message: content.trim(),
        category: category
      });

      // Send to AI
      const response = await sendMessageToAI(
        content.trim(),
        messages,
        category
      );

      const assistantMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };

      // Check if response contains code blocks and track them
      const codeBlockCount = (response.match(/```/g) || []).length / 2;
      if (codeBlockCount > 0) {
        // Track each code block
        for (let i = 0; i < codeBlockCount; i++) {
          trackCodeGeneration(userId, {
            category: category,
            timestamp: new Date().toISOString()
          });
        }
      }

      const updatedMessages = [...messages, userMessage, assistantMessage];
      setMessages(updatedMessages);

      // Save to history
      await saveChatHistory(updatedMessages);

    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message');
      
      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: `Maaf, terjadi error: ${err.message}. Silakan coba lagi.`,
        timestamp: new Date().toISOString(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [messages, category]);

  const clearMessages = useCallback(async () => {
    setMessages([]);
    try {
      await saveChatHistory([]);
    } catch (err) {
      console.error('Error clearing history:', err);
    }
  }, []);

  const hasMessages = useCallback(() => {
    return messages.length > 0;
  }, [messages]);

  return {
    messages,
    loading,
    category,
    error,
    setCategory,
    sendMessage,
    clearMessages,
    hasMessages
  };
};
