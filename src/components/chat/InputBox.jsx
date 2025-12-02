import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Trash2 } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { CATEGORIES } from '../../utils/constants';

/**
 * Chat Input Box Component
 * Handles message input and sending
 */
const InputBox = () => {
  const { sendMessage, loading, category, clearMessages, hasMessages } = useChat();
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Focus input on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;

    sendMessage(input);
    setInput('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    if (window.confirm('Yakin ingin menghapus semua pesan?')) {
      clearMessages();
      setInput('');
    }
  };

  const currentCategory = CATEGORIES.find(cat => cat.id === category);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tanya sesuatu tentang Roblox Studio..."
            rows={1}
            className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none min-h-[48px] max-h-[200px] custom-scrollbar"
            disabled={loading}
          />
          
          {/* Clear Button */}
          {hasMessages() && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl transition-all flex items-center justify-center"
              title="Clear chat"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}

          {/* Send Button */}
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-3 font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-purple-500/50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="hidden sm:inline">Processing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Send</span>
              </>
            )}
          </button>
        </div>

        {/* Info Bar */}
        <div className="flex items-center justify-between mt-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Category: <span className="text-purple-400 font-medium">{currentCategory?.name}</span>
            </span>
            <span className="text-gray-500">
              Powered by Claude AI
            </span>
          </div>
          
          <span className="text-gray-500 hidden sm:inline">
            Press Enter to send, Shift+Enter for new line
          </span>
        </div>
      </form>
    </div>
  );
};

export default InputBox;
