import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const MessageItem = ({ message, index }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = async (text, idx) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const extractCodeBlocks = (text) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({ 
          type: 'text', 
          content: text.slice(lastIndex, match.index) 
        });
      }
      
      // Add code block
      parts.push({ 
        type: 'code', 
        language: match[1] || 'lua', 
        content: match[2].trim() 
      });
      
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ 
        type: 'text', 
        content: text.slice(lastIndex) 
      });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`max-w-3xl rounded-2xl p-4 ${
        message.role === 'user'
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
          : 'bg-white/10 backdrop-blur-sm border border-white/10'
      }`}>
        {message.role === 'assistant' ? (
          <div className="space-y-3">
            {extractCodeBlocks(message.content).map((part, i) => (
              <div key={i}>
                {part.type === 'text' ? (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {part.content}
                  </p>
                ) : (
                  <div className="relative group mt-3">
                    {/* Code header */}
                    <div className="flex items-center justify-between bg-black/50 px-3 py-2 rounded-t-lg">
                      <span className="text-xs text-gray-400 font-mono uppercase">
                        {part.language}
                      </span>
                      <button
                        onClick={() => copyToClipboard(part.content, `${index}-${i}`)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        title="Copy code"
                      >
                        {copiedIndex === `${index}-${i}` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Code content */}
                    <pre className="bg-black/70 p-4 rounded-b-lg overflow-x-auto">
                      <code className="text-sm font-mono text-green-400">
                        {part.content}
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-relaxed">{message.content}</p>
        )}
        
        {/* Timestamp */}
        {message.timestamp && (
          <p className="text-xs text-gray-400 mt-2">
            {new Date(message.timestamp).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
