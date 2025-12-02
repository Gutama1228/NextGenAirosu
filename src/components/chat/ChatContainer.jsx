import React from 'react';
import { useChat } from '../../hooks/useChat';
import MessageList from './MessageList';
import InputBox from './InputBox';
import { Sparkles } from 'lucide-react';

/**
 * Main Chat Container Component
 * Contains message list and input box
 */
const ChatContainer = () => {
  const { messages, loading, category } = useChat();

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-120px)]">
      {/* Empty State - Show when no messages */}
      {messages.length === 0 && !loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Sparkles className="w-12 h-12" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-3">
                Selamat Datang di Roblox AI Studio! 👋
              </h2>
              <p className="text-gray-400 text-lg">
                Mulai percakapan dengan memilih quick prompt atau ketik pertanyaan Anda
              </p>
            </div>

            {/* Quick Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-left">
                <div className="text-2xl mb-2">💡</div>
                <h3 className="font-semibold mb-1">Tips</h3>
                <p className="text-sm text-gray-400">
                  Gunakan category yang sesuai untuk hasil lebih akurat
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-left">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold mb-1">Quick Prompts</h3>
                <p className="text-sm text-gray-400">
                  Gunakan template pertanyaan di sidebar untuk memulai
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-left">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-semibold mb-1">Spesifik</h3>
                <p className="text-sm text-gray-400">
                  Pertanyaan yang detail akan mendapat jawaban lebih baik
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-left">
                <div className="text-2xl mb-2">📋</div>
                <h3 className="font-semibold mb-1">Code Blocks</h3>
                <p className="text-sm text-gray-400">
                  Klik tombol copy untuk copy code dengan mudah
                </p>
              </div>
            </div>

            {/* Current Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm">
              <span className="text-purple-400">Category:</span>
              <span className="font-semibold capitalize">{category}</span>
            </div>
          </div>
        </div>
      )}

      {/* Message List */}
      {messages.length > 0 && (
        <MessageList />
      )}

      {/* Input Box */}
      <InputBox />
    </div>
  );
};

export default ChatContainer;
