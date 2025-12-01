import React from 'react';
import { Code, Palette, Sparkles, Zap, BookOpen, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, category, setCategory, onQuickPrompt }) => {
  const categories = [
    { id: 'general', name: 'General', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
    { id: 'coding', name: 'Coding', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { id: 'design', name: 'Design', icon: Palette, color: 'from-orange-500 to-red-500' },
    { id: 'optimization', name: 'Optimization', icon: Zap, color: 'from-green-500 to-emerald-500' },
    { id: 'learning', name: 'Learning', icon: BookOpen, color: 'from-indigo-500 to-purple-500' },
  ];

  const quickPrompts = [
    { text: 'Buat sistem inventory sederhana', category: 'coding' },
    { text: 'Cara optimize game untuk mobile', category: 'optimization' },
    { text: 'Desain shop UI yang menarik', category: 'design' },
    { text: 'Explain RemoteEvents vs RemoteFunctions', category: 'learning' },
  ];

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        fixed md:relative
        inset-y-0 left-0
        w-64 md:w-64
        bg-slate-900/95 md:bg-transparent
        backdrop-blur-lg md:backdrop-blur-none
        border-r border-white/10 md:border-none
        p-4
        transition-transform duration-300 ease-in-out
        z-40
        overflow-y-auto
        space-y-4
      `}>
        {/* Close button untuk mobile */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Categories */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-semibold mb-3 text-gray-300">Categories</h3>
          <div className="space-y-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
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

        {/* Quick Prompts */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-semibold mb-3 text-gray-300">Quick Prompts</h3>
          <div className="space-y-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onQuickPrompt(prompt)}
                className="w-full text-left p-3 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                {prompt.text}
              </button>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
          <h3 className="text-sm font-semibold mb-2 text-blue-300">💡 Tips</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Gunakan category yang sesuai untuk hasil lebih akurat. 
            Untuk coding, pilih "Coding". Untuk design, pilih "Design".
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
