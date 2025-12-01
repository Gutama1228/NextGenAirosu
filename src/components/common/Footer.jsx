import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Roblox AI Studio
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              AI Assistant profesional untuk membantu Roblox Studio Developers dengan coding, 
              design, optimization, dan learning. Powered by Claude AI.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="mailto:support@robloxai.studio"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Chat
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Roblox AI Studio. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> for Roblox Developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
