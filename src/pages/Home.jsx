import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Code, Palette, Zap, BookOpen, ArrowRight, 
  CheckCircle, Star, Users, MessageSquare, Twitter, 
  Mail, ExternalLink 
} from 'lucide-react';
import { getRealTimeStats } from '../services/tracking';

const Home = () => {
  // Real-time stats from ACTUAL USER ACTIVITY
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalChats: 0,
    codeSnippets: 0,
    userRating: 0
  });
  const [loading, setLoading] = useState(true);

  // Site configuration
  const [siteConfig, setSiteConfig] = useState({
    siteName: 'Roblox AI Studio',
    tagline: 'Your Development Assistant',
    logoUrl: ''
  });

  // Fetch REAL stats from activity tracking
  useEffect(() => {
    const fetchStats = () => {
      try {
        // Get real-time stats from tracking system
        const realStats = getRealTimeStats();
        
        setStats({
          totalUsers: realStats.totalUsers,
          activeUsers: realStats.activeUsers,
          totalChats: realStats.totalChats,
          codeSnippets: realStats.codeSnippets,
          userRating: realStats.userRating
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
    
    // Refresh stats every 10 seconds to show real-time changes
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  // Fetch site config
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const savedConfig = localStorage.getItem('site_config');
        if (savedConfig) {
          setSiteConfig(JSON.parse(savedConfig));
        }
      } catch (error) {
        console.error('Error fetching site config:', error);
      }
    };
    fetchConfig();
  }, []);

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Code Generation',
      description: 'Generate Lua/Luau code untuk game mechanics, systems, dan lebih banyak lagi',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Dapatkan saran desain UI yang modern dan user-friendly untuk game Anda',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Optimization',
      description: 'Tips dan trik untuk meningkatkan performa game dan mengurangi lag',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Learning Resources',
      description: 'Tutorial lengkap dan penjelasan konsep dari dasar hingga advanced',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const benefits = [
    '24/7 AI Assistant yang selalu siap membantu',
    'Response cepat dengan kualitas tinggi',
    'Multi-category untuk hasil lebih akurat',
    'Syntax highlighting untuk code blocks',
    'Copy-paste code dengan mudah',
    'Gratis untuk semua developer'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-lg bg-black/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {siteConfig.logoUrl ? (
              <img 
                src={siteConfig.logoUrl} 
                alt={siteConfig.siteName}
                className="w-10 h-10 rounded-lg"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold">{siteConfig.siteName}</h1>
              <p className="text-xs text-gray-400">{siteConfig.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium hover:text-purple-400 transition-colors hidden sm:block"
            >
              Masuk
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all shadow-lg"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
          AI Assistant untuk
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Roblox Developers
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 animate-fade-in">
          Tingkatkan produktivitas development Anda dengan AI assistant yang memahami Roblox Studio. 
          Dari coding hingga design, kami siap membantu!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <Link 
            to="/register"
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
          >
            Mulai Sekarang
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/login"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-lg transition-all backdrop-blur-sm"
          >
            Lihat Demo
          </Link>
        </div>

        {/* Real-time Stats from ACTUAL USER ACTIVITY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {/* Active Users - Real count of users currently online */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="flex justify-center mb-3 text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold mb-1 transition-all duration-500">
              {loading ? (
                <div className="h-8 bg-white/10 rounded animate-pulse"></div>
              ) : (
                `${stats.activeUsers}+`
              )}
            </div>
            <div className="text-sm text-gray-400">Active Users</div>
            {!loading && (
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-green-400">
                <span className="animate-pulse">●</span> Live
              </div>
            )}
          </div>

          {/* Total Chats - Real count from user messages */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="flex justify-center mb-3 text-blue-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold mb-1 transition-all duration-500">
              {loading ? (
                <div className="h-8 bg-white/10 rounded animate-pulse"></div>
              ) : (
                `${stats.totalChats.toLocaleString()}+`
              )}
            </div>
            <div className="text-sm text-gray-400">Chats Generated</div>
            {!loading && (
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-green-400">
                <span className="animate-pulse">●</span> Live
              </div>
            )}
          </div>

          {/* Code Snippets - Real count from AI responses with code */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="flex justify-center mb-3 text-green-400">
              <Code className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold mb-1 transition-all duration-500">
              {loading ? (
                <div className="h-8 bg-white/10 rounded animate-pulse"></div>
              ) : (
                `${stats.codeSnippets.toLocaleString()}+`
              )}
            </div>
            <div className="text-sm text-gray-400">Code Snippets</div>
            {!loading && (
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-green-400">
                <span className="animate-pulse">●</span> Live
              </div>
            )}
          </div>

          {/* User Rating - Real average from user ratings */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="flex justify-center mb-3 text-yellow-400">
              <Star className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold mb-1 transition-all duration-500">
              {loading ? (
                <div className="h-8 bg-white/10 rounded animate-pulse"></div>
              ) : (
                `${stats.userRating}/5`
              )}
            </div>
            <div className="text-sm text-gray-400">User Rating</div>
            {!loading && (
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-green-400">
                <span className="animate-pulse">●</span> Live
              </div>
            )}
          </div>
        </div>

        {/* Info about real-time tracking */}
        {!loading && (
          <div className="mt-8 text-xs text-gray-500">
            <p>📊 Stats updated real-time from actual user activity • Last update: {new Date().toLocaleTimeString()}</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Fitur Unggulan</h2>
          <p className="text-gray-400 text-lg">Tools lengkap untuk semua kebutuhan development Anda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group cursor-pointer"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Kenapa Memilih
              <br />
              <span className="text-purple-400">Roblox AI Studio?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Kami hadir untuk membuat proses development Anda lebih efisien, 
              produktif, dan menyenangkan. Dengan teknologi AI terbaru, 
              dapatkan solusi instant untuk setiap masalah development Anda.
            </p>
            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 animate-fade-in" style={{animationDelay: `${idx * 0.1}s`}}>
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Chat Preview */}
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="bg-black/50 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  👤
                </div>
                <div className="flex-1">
                  <div className="bg-white/10 rounded-lg p-3 text-sm">
                    Bagaimana cara membuat sistem inventory yang efficient?
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  🤖
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg p-3 text-sm">
                    Saya akan bantu Anda membuat sistem inventory! Ini contoh code nya...
                    <div className="mt-2 bg-black/50 rounded p-2 font-mono text-xs text-green-400">
                      {`local Inventory = {}
function Inventory:AddItem(item)
  table.insert(self.items, item)
end`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">
            Siap Meningkatkan Development Anda?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Bergabung dengan {stats.totalUsers > 0 ? stats.totalUsers : 'ribuan'} developer yang sudah menggunakan Roblox AI Studio
          </p>
          <Link 
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 rounded-xl font-semibold text-lg transition-all shadow-lg transform hover:scale-105"
          >
            Daftar Gratis Sekarang
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {siteConfig.logoUrl ? (
                  <img 
                    src={siteConfig.logoUrl} 
                    alt={siteConfig.siteName}
                    className="w-10 h-10 rounded-lg"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                )}
                <h3 className="text-xl font-bold">{siteConfig.siteName}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4 max-w-md">
                Platform AI assistant terdepan untuk Roblox developers. 
                Dapatkan bantuan coding, design, optimization, dan learning dari AI yang powerful.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-purple-400">Navigasi</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/login" className="hover:text-purple-400 transition-colors">Login</Link></li>
                <li><Link to="/register" className="hover:text-purple-400 transition-colors">Register</Link></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2">Documentation<ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2">API Reference<ExternalLink className="w-3 h-3" /></a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-purple-400">Komunitas</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2">Discord Server<ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2">Twitter<ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <p>© {new Date().getFullYear()} {siteConfig.siteName}</p>
              <span>•</span>
              <p>Made with ❤️ for Roblox Developers</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
