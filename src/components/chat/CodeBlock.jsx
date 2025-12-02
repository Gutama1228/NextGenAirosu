import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * Code Block Component
 * Displays code with syntax highlighting and copy button
 */
const CodeBlock = ({ code, language = 'lua', index = 0 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group my-3">
      {/* Code Header */}
      <div className="flex items-center justify-between bg-black/50 px-3 py-2 rounded-t-lg border-b border-white/10">
        <span className="text-xs text-gray-400 font-mono uppercase">
          {language || 'code'}
        </span>
        
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-white/10 rounded transition-colors"
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="relative">
        <pre className="bg-black/70 p-4 rounded-b-lg overflow-x-auto custom-scrollbar">
          <code className="text-sm font-mono text-green-400 leading-relaxed">
            {code}
          </code>
        </pre>

        {/* Line numbers (optional) */}
        {code.split('\n').length > 5 && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-black/50 flex flex-col items-center justify-start pt-4 text-xs text-gray-600 font-mono select-none pointer-events-none">
            {code.split('\n').map((_, i) => (
              <div key={i} className="leading-relaxed">
                {i + 1}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Copy feedback tooltip */}
      {copied && (
        <div className="absolute top-2 right-16 bg-green-600 text-white text-xs px-2 py-1 rounded animate-fade-in">
          Copied!
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
