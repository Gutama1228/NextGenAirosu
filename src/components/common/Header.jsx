// ==================== src/components/common/Header.jsx ====================
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ userName }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Roblox AI Studio
            </h1>
            <p className="text-xs text-gray-400">Your Development Assistant</p>
          </div>
        </Link>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span className="font-medium">{userName}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-white/10 rounded-lg shadow-lg overflow-hidden">
              <div className="p-3 border-b border-white/10">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Admin Panel</span>
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-white/10 transition-colors text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

// ==================== src/components/common/Sidebar.jsx ====================
import React from 'react';
import { Code, Palette, Sparkles, Zap, BookOpen } from 'lucide-react';
import { CATEGORIES, QUICK_PROMPTS } from '../../utils/constants';

const Sidebar = ({ isOpen, onClose, category, setCategory, onQuickPrompt }) => {
  const getIcon = (iconName) => {
    const icons = { Code, Palette, Sparkles, Zap, BookOpen };
    return icons[iconName] || Sparkles;
  };

  return (
    <aside className={`${
      isOpen ? 'block' : 'hidden'
    } md:block w-full md:w-64 space-y-4 absolute md:relative bg-slate-900/95 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none z-40`}>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => {
            const Icon = getIcon(cat.icon);
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setCategory(cat.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  category === cat.id
                    ? `bg-gradient-to-r ${cat.color} shadow-lg scale-105`
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">Quick Prompts</h3>
        <div className="space-y-2">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onQuickPrompt(prompt)}
              className="w-full text-left p-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              {prompt.text}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <h3 className="text-sm font-semibold mb-2 text-gray-300">Tips</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          💡 Gunakan category yang sesuai untuk hasil lebih akurat. 
          Untuk coding, pilih "Coding". Untuk design, pilih "Design".
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

// ==================== src/components/chat/MessageItem.jsx ====================
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
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      parts.push({ type: 'code', language: match[1] || 'lua', content: match[2].trim() });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-3xl rounded-2xl p-4 ${
        message.role === 'user'
          ? 'bg-gradient-to-r from-blue-600 to-purple-600'
          : 'bg-white/10 backdrop-blur-sm border border-white/10'
      }`}>
        {message.role === 'assistant' ? (
          <div className="space-y-3">
            {extractCodeBlocks(message.content).map((part, i) => (
              <div key={i}>
                {part.type === 'text' ? (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{part.content}</p>
                ) : (
                  <div className="relative group">
                    <div className="flex items-center justify-between bg-black/50 px-3 py-2 rounded-t-lg">
                      <span className="text-xs text-gray-400 font-mono">{part.language}</span>
                      <button
                        onClick={() => copyToClipboard(part.content, `${index}-${i}`)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        {copiedIndex === `${index}-${i}` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <pre className="bg-black/70 p-4 rounded-b-lg overflow-x-auto">
                      <code className="text-sm font-mono text-green-400">{part.content}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm">{message.content}</p>
        )}
      </div>
    </div>
  );
};

export default MessageItem;

// ==================== src/components/common/LoadingSpinner.jsx ====================
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizes[size]} animate-spin text-purple-500`} />
      {text && <p className="text-sm text-gray-400">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;

// ==================== src/components/common/Button.jsx ====================
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  icon = null
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    secondary: 'bg-white/10 hover:bg-white/20',
    danger: 'bg-red-600 hover:bg-red-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${className}
        rounded-lg font-medium transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center gap-2
      `}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
