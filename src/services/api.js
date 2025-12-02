import axios from 'axios';
import { DEMO_CREDENTIALS, API_ENDPOINTS } from '../utils/constants';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH API ====================

export const login = async (email, password) => {
  // Simulate API call with demo credentials
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check demo credentials
      const isAdmin = email === DEMO_CREDENTIALS.ADMIN.email && 
                     password === DEMO_CREDENTIALS.ADMIN.password;
      const isUser = email === DEMO_CREDENTIALS.USER.email && 
                    password === DEMO_CREDENTIALS.USER.password;

      if (isAdmin || isUser) {
        const user = {
          id: isAdmin ? 1 : 2,
          name: isAdmin ? 'Admin User' : 'Regular User',
          email,
          role: isAdmin ? 'admin' : 'user',
          token: 'fake-jwt-token-' + Date.now(),
          avatar: null,
          createdAt: new Date().toISOString(),
        };
        resolve(user);
      } else {
        reject(new Error('Email atau password salah'));
      }
    }, 800);
  });
};

export const register = async (name, email, password) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = {
        id: Date.now(),
        name,
        email,
        role: 'user',
        token: 'fake-jwt-token-' + Date.now(),
        avatar: null,
        createdAt: new Date().toISOString(),
      };
      resolve(user);
    }, 1000);
  });
};

export const logout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      resolve({ success: true });
    }, 300);
  });
};

// ==================== USER API ====================

export const getUsers = async () => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = [
        {
          id: 1,
          name: 'Admin User',
          email: 'admin@roblox.ai',
          role: 'admin',
          status: 'active',
          joinDate: '2024-01-15',
          lastActive: '2024-12-02',
          totalChats: 156,
        },
        {
          id: 2,
          name: 'John Developer',
          email: 'john@example.com',
          role: 'user',
          status: 'active',
          joinDate: '2024-02-20',
          lastActive: '2024-12-01',
          totalChats: 89,
        },
        {
          id: 3,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'user',
          status: 'active',
          joinDate: '2024-03-10',
          lastActive: '2024-11-30',
          totalChats: 134,
        },
        {
          id: 4,
          name: 'Bob Wilson',
          email: 'bob@example.com',
          role: 'user',
          status: 'inactive',
          joinDate: '2024-01-05',
          lastActive: '2024-10-15',
          totalChats: 45,
        },
        {
          id: 5,
          name: 'Alice Brown',
          email: 'alice@example.com',
          role: 'moderator',
          status: 'active',
          joinDate: '2024-02-01',
          lastActive: '2024-12-02',
          totalChats: 201,
        },
      ];
      resolve(users);
    }, 500);
  });
};

export const getUserById = async (id) => {
  const users = await getUsers();
  return users.find(user => user.id === id);
};

export const updateUser = async (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: { id, ...data } });
    }, 500);
  });
};

export const deleteUser = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id });
    }, 500);
  });
};

// ==================== ANALYTICS API ====================

export const getAnalytics = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const analytics = {
        overview: {
          totalUsers: 1250,
          activeUsers: 850,
          totalChats: 15640,
          avgResponseTime: 1.2,
        },
        userGrowth: [
          { month: 'Jan', users: 400, chats: 2400 },
          { month: 'Feb', users: 600, chats: 3200 },
          { month: 'Mar', users: 800, chats: 4100 },
          { month: 'Apr', users: 1000, chats: 5200 },
          { month: 'May', users: 1250, chats: 6800 },
        ],
        categoryUsage: [
          { name: 'Coding', value: 4200, color: '#3b82f6' },
          { name: 'Design', value: 2800, color: '#f97316' },
          { name: 'Optimization', value: 1900, color: '#10b981' },
          { name: 'Learning', value: 3100, color: '#8b5cf6' },
          { name: 'General', value: 2400, color: '#ec4899' },
        ],
        topPrompts: [
          { prompt: 'Buat sistem inventory', count: 342, category: 'coding' },
          { prompt: 'Optimize mobile performance', count: 289, category: 'optimization' },
          { prompt: 'Desain shop UI', count: 256, category: 'design' },
          { prompt: 'RemoteEvents tutorial', count: 234, category: 'learning' },
          { prompt: 'Combat system guide', count: 198, category: 'coding' },
        ],
        recentActivity: [
          {
            id: 1,
            user: 'John Doe',
            action: 'Started a new chat session',
            category: 'coding',
            timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
          },
          {
            id: 2,
            user: 'Jane Smith',
            action: 'Generated Lua code snippet',
            category: 'coding',
            timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
          },
          {
            id: 3,
            user: 'Bob Wilson',
            action: 'Asked about UI design',
            category: 'design',
            timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
          },
          {
            id: 4,
            user: 'Alice Brown',
            action: 'Requested optimization tips',
            category: 'optimization',
            timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
          },
        ],
      };
      resolve(analytics);
    }, 500);
  });
};

export const getCategoryStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = [
        {
          category: 'Coding',
          totalQueries: 4200,
          avgResponseTime: 1.1,
          satisfaction: 4.8,
          trend: '+12%',
        },
        {
          category: 'Design',
          totalQueries: 2800,
          avgResponseTime: 1.3,
          satisfaction: 4.6,
          trend: '+8%',
        },
        {
          category: 'Optimization',
          totalQueries: 1900,
          avgResponseTime: 1.0,
          satisfaction: 4.9,
          trend: '+15%',
        },
        {
          category: 'Learning',
          totalQueries: 3100,
          avgResponseTime: 1.4,
          satisfaction: 4.7,
          trend: '+10%',
        },
        {
          category: 'General',
          totalQueries: 2400,
          avgResponseTime: 1.2,
          satisfaction: 4.5,
          trend: '+5%',
        },
      ];
      resolve(stats);
    }, 500);
  });
};

// ==================== CHAT API ====================

export const sendChatMessage = async (message, category) => {
  // This will be handled by anthropic.js
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        messageId: Date.now(),
      });
    }, 100);
  });
};

export const getChatHistory = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const history = JSON.parse(localStorage.getItem('chat_history') || '[]');
      resolve(history);
    }, 300);
  });
};

export const saveChatHistory = async (messages) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem('chat_history', JSON.stringify(messages));
      resolve({ success: true });
    }, 100);
  });
};

export const clearChatHistory = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('chat_history');
      resolve({ success: true });
    }, 100);
  });
};

// ==================== SETTINGS API ====================

export const getSettings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const settings = {
        api: {
          model: 'claude-sonnet-4-20250514',
          maxTokens: 4096,
          temperature: 0.7,
        },
        features: {
          userRegistration: true,
          maintenance: false,
          analytics: true,
        },
        ui: {
          theme: 'dark',
          language: 'id',
        },
      };
      resolve(settings);
    }, 300);
  });
};

export const updateSettings = async (settings) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, settings });
    }, 500);
  });
};

export default api;
