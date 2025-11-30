# 🚀 Roblox AI Studio - Full Stack React Application

AI Assistant profesional untuk membantu Roblox Studio Developers dengan coding, design, optimization, dan learning.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)

## ✨ Features

### 🎯 User Features
- **Multi-Category AI Chat**: General, Coding, Design, Optimization, Learning
- **Real-time Code Generation**: Generate Lua/Luau code untuk Roblox
- **Syntax Highlighting**: Code blocks dengan syntax highlighting
- **Copy to Clipboard**: Copy code dengan satu klik
- **Quick Prompts**: Template pertanyaan untuk memulai
- **Responsive Design**: Mobile, tablet, dan desktop friendly
- **Authentication**: Login & Register system

### 👑 Admin Features
- **Dashboard**: Overview statistics & analytics
- **User Management**: Kelola users, roles, permissions
- **Analytics**: Charts untuk usage tracking
- **Settings Panel**: Konfigurasi API dan website
- **Real-time Data**: Live statistics dan monitoring

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI Library
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Backend (API)
- **Anthropic Claude API** - AI Processing
- **Context API** - State management

## 📋 Prerequisites

Sebelum memulai, pastikan Anda sudah install:

- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- Git
- Account GitHub
- Account Vercel (gratis)
- Anthropic API Key (opsional untuk production)

## 🚀 Quick Start

### 1. Clone Repository

```bash
# Clone dari GitHub
git clone https://github.com/yourusername/roblox-ai-studio.git
cd roblox-ai-studio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env` di root folder:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
REACT_APP_ENV=development
```

### 4. Run Development Server

```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📁 Struktur Folder Lengkap

```
roblox-ai-studio/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx          # Navbar component
│   │   │   ├── Footer.jsx          # Footer component
│   │   │   ├── Sidebar.jsx         # Sidebar untuk categories
│   │   │   ├── LoadingSpinner.jsx  # Loading indicator
│   │   │   └── Button.jsx          # Reusable button
│   │   ├── chat/
│   │   │   ├── ChatContainer.jsx   # Chat wrapper
│   │   │   ├── MessageList.jsx     # List of messages
│   │   │   ├── MessageItem.jsx     # Individual message
│   │   │   ├── InputBox.jsx        # Input form
│   │   │   └── CodeBlock.jsx       # Code display
│   │   └── admin/
│   │       ├── Dashboard.jsx       # Admin dashboard
│   │       ├── UserManagement.jsx  # User CRUD
│   │       ├── Analytics.jsx       # Charts & stats
│   │       ├── Settings.jsx        # Configuration
│   │       └── PromptManager.jsx   # Manage prompts
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── Chat.jsx               # Main chat interface
│   │   ├── Login.jsx              # Login page
│   │   ├── Register.jsx           # Register page
│   │   └── Admin.jsx              # Admin panel
│   ├── context/
│   │   ├── AuthContext.jsx        # Authentication state
│   │   ├── ChatContext.jsx        # Chat state
│   │   └── ThemeContext.jsx       # Theme state
│   ├── hooks/
│   │   ├── useAuth.js             # Auth hook
│   │   ├── useChat.js             # Chat hook
│   │   ├── useLocalStorage.js     # Storage hook
│   │   └── useApi.js              # API hook
│   ├── services/
│   │   ├── api.js                 # API calls
│   │   ├── anthropic.js           # Claude AI integration
│   │   └── storage.js             # Local storage
│   ├── utils/
│   │   ├── helpers.js             # Helper functions
│   │   ├── constants.js           # Constants
│   │   └── validators.js          # Form validators
│   ├── styles/
│   │   ├── index.css              # Global styles
│   │   ├── components.css         # Component styles
│   │   └── animations.css         # Animation styles
│   ├── routes/
│   │   └── AppRouter.jsx          # Route configuration
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # App styles
│   └── index.js                   # Entry point
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── README.md                      # Documentation
```

## 🔐 Authentication

### Demo Accounts

```
Admin Account:
Email: admin@roblox.ai
Password: password123
Role: admin (akses ke admin panel)

User Account:
Email: user@roblox.ai
Password: password123
Role: user (akses ke chat saja)
```

### Membuat User Baru

1. Klik "Daftar" di navbar
2. Isi form registrasi
3. Login dengan credentials baru

## 📦 Deployment ke Vercel

### Step-by-Step Deployment

#### 1. Persiapan Kode

```bash
# Pastikan semua perubahan sudah di-commit
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Setup GitHub Repository

```bash
# Buat repo baru di GitHub
# Lalu push code Anda

git remote add origin https://github.com/yourusername/roblox-ai-studio.git
git branch -M main
git push -u origin main
```

#### 3. Deploy ke Vercel

**Via Vercel Dashboard:**

1. Buka [vercel.com](https://vercel.com)
2. Sign in dengan GitHub
3. Click "Add New Project"
4. Import repository Anda
5. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

6. Add Environment Variables:
   ```
   REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
   REACT_APP_ENV=production
   ```

7. Click "Deploy"

**Via Vercel CLI:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### 4. Post-Deployment

Setelah deployment berhasil:

1. Vercel akan memberikan URL: `https://your-project.vercel.app`
2. Setup custom domain (opsional)
3. Configure environment variables di Vercel dashboard
4. Monitor analytics di Vercel dashboard

## 🔧 Configuration

### Tailwind CSS

File: `tailwind.config.js`

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        secondary: '#3B82F6',
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
      }
    },
  },
  plugins: [],
}
```

### Environment Variables

Buat file `.env`:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ANTHROPIC_API_KEY=sk-ant-xxxxx

# Environment
REACT_APP_ENV=development

# Optional
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_DEBUG=true
```

## 🎨 Customization

### Mengubah Warna Theme

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
}
```

### Menambah Category Baru

Edit `src/utils/constants.js`:

```javascript
export const CATEGORIES = [
  // ... existing categories
  { 
    id: 'newcategory', 
    name: 'New Category', 
    icon: 'IconName', 
    color: 'from-color-500 to-color-500' 
  },
];
```

### Menambah Quick Prompt

Edit `src/utils/constants.js`:

```javascript
export const QUICK_PROMPTS = [
  // ... existing prompts
  { text: 'Your new prompt', category: 'coding' },
];
```

## 📊 Admin Panel Features

### Dashboard
- Total Users
- Active Users
- Total Chats
- Average Response Time
- User Growth Chart
- Chat Activity Chart
- Recent Activity Log

### User Management
- View all users
- Edit user details
- Delete users
- Manage roles (admin/user)
- View registration dates

### Analytics
- Category usage statistics
- Top prompts
- User engagement metrics
- Response time analytics

### Settings
- API configuration
- Model version selection
- Enable/disable features
- Maintenance mode

## 🔒 Security

### Best Practices

1. **Environment Variables**: Jangan commit `.env` file
2. **API Keys**: Simpan di environment variables
3. **Authentication**: Implement proper JWT tokens
4. **CORS**: Configure CORS untuk production
5. **Rate Limiting**: Implement rate limiting untuk API

### Production Security Checklist

- [ ] Environment variables configured
- [ ] API keys stored securely
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] XSS protection enabled

## 🐛 Troubleshooting

### Common Issues

**1. Build Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**2. Tailwind styles not working**
```bash
# Make sure Tailwind is configured
npx tailwindcss init -p
```

**3. API calls failing**
```bash
# Check environment variables
cat .env
```

**4. Deployment fails on Vercel**
- Check build logs di Vercel dashboard
- Pastikan semua dependencies ada di package.json
- Check environment variables configuration

## 📝 Development Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (NOT RECOMMENDED)
npm run eject

# Lint code
npm run lint

# Format code
npm run format
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your@email.com

## 🙏 Acknowledgments

- [Anthropic Claude](https://www.anthropic.com/) - AI API
- [React](https://react.dev/) - UI Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Hosting
- [Lucide](https://lucide.dev/) - Icons

## 📞 Support

Jika ada pertanyaan atau masalah:

1. Buka [GitHub Issues](https://github.com/yourusername/roblox-ai-studio/issues)
2. Email: support@robloxai.studio
3. Discord: [Join our community](#)

## 🗺️ Roadmap

- [ ] Backend API dengan Node.js + Express
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real authentication dengan JWT
- [ ] File upload untuk assets
- [ ] Code playground/editor
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Export chat history
- [ ] AI model selection

---

Made with ❤️ for Roblox Developers

**⭐ Star this repo if you find it helpful!**
