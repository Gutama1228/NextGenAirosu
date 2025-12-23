// ========================================
// FILE: src/services/tracking.js
// Real-time Analytics Tracking Service
// ========================================

/**
 * Track user activity in real-time
 */
export const trackActivity = {
  /**
   * Track user login
   */
  login: (userId) => {
    const activity = {
      userId,
      type: 'login',
      timestamp: Date.now()
    };
    
    // Save to localStorage for tracking
    localStorage.setItem('last_activity', JSON.stringify(activity));
    
    // Update active users count
    updateActiveUsers(userId);
  },

  /**
   * Track new chat message
   */
  chat: (userId, message, containsCode = false) => {
    // Get current stats
    const stats = getLocalStats();
    
    // Increment total chats
    stats.totalChats = (stats.totalChats || 0) + 1;
    
    // Increment code snippets if message contains code
    if (containsCode) {
      stats.codeSnippets = (stats.codeSnippets || 0) + 1;
    }
    
    // Save updated stats
    saveLocalStats(stats);
    
    // Track activity timestamp
    updateUserActivity(userId);
  },

  /**
   * Track user registration
   */
  register: (userId) => {
    const stats = getLocalStats();
    stats.totalUsers = (stats.totalUsers || 0) + 1;
    saveLocalStats(stats);
    
    // Also track as login
    trackActivity.login(userId);
  },

  /**
   * Get real-time statistics
   */
  getStats: () => {
    const stats = getLocalStats();
    const activeUsers = getActiveUsersCount();
    
    return {
      totalUsers: stats.totalUsers || 0,
      activeUsers: activeUsers,
      totalChats: stats.totalChats || 0,
      codeSnippets: stats.codeSnippets || 0,
      userRating: 4.9 // Fixed or can be made dynamic
    };
  }
};

/**
 * Update active users list
 */
const updateActiveUsers = (userId) => {
  const activeUsers = getActiveUsers();
  const now = Date.now();
  
  // Add or update user's last activity
  activeUsers[userId] = now;
  
  // Clean up users inactive for more than 24 hours
  Object.keys(activeUsers).forEach(id => {
    if (now - activeUsers[id] > 24 * 60 * 60 * 1000) {
      delete activeUsers[id];
    }
  });
  
  localStorage.setItem('active_users', JSON.stringify(activeUsers));
};

/**
 * Update user activity timestamp
 */
const updateUserActivity = (userId) => {
  const now = Date.now();
  const activeUsers = getActiveUsers();
  activeUsers[userId] = now;
  localStorage.setItem('active_users', JSON.stringify(activeUsers));
};

/**
 * Get active users object
 */
const getActiveUsers = () => {
  try {
    const data = localStorage.getItem('active_users');
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

/**
 * Get count of active users (last 24 hours)
 */
const getActiveUsersCount = () => {
  const activeUsers = getActiveUsers();
  const now = Date.now();
  const oneDayAgo = now - (24 * 60 * 60 * 1000);
  
  return Object.values(activeUsers).filter(timestamp => timestamp > oneDayAgo).length;
};

/**
 * Get statistics from localStorage
 */
const getLocalStats = () => {
  try {
    const data = localStorage.getItem('site_stats');
    return data ? JSON.parse(data) : {
      totalUsers: 0,
      totalChats: 0,
      codeSnippets: 0
    };
  } catch {
    return {
      totalUsers: 0,
      totalChats: 0,
      codeSnippets: 0
    };
  }
};

/**
 * Save statistics to localStorage
 */
const saveLocalStats = (stats) => {
  localStorage.setItem('site_stats', JSON.stringify(stats));
};

/**
 * Detect if message contains code
 */
export const detectCode = (message) => {
  // Check for common code patterns
  const codePatterns = [
    /```[\s\S]*?```/g, // Code blocks
    /`[^`]+`/g, // Inline code
    /function\s+\w+\s*\(/g, // Function declarations
    /local\s+\w+\s*=/g, // Lua local variables
    /if\s+.+\s+then/g, // Lua if statements
    /for\s+.+\s+do/g, // Lua for loops
    /while\s+.+\s+do/g, // Lua while loops
  ];
  
  return codePatterns.some(pattern => pattern.test(message));
};

// ========================================
// INTEGRATION EXAMPLES
// ========================================

/*
// In AuthContext.jsx - login function:
const login = async (email, password) => {
  try {
    const userData = await apiLogin(email, password);
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    localStorage.setItem('current_user_id', userData.id);
    
    setUser(userData);
    
    // ✅ Track login activity
    trackActivity.login(userData.id);
    
    return { success: true, user: userData };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// In AuthContext.jsx - register function:
const register = async (name, email, password) => {
  try {
    const userData = await apiRegister(name, email, password);
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    localStorage.setItem('current_user_id', userData.id);
    
    setUser(userData);
    
    // ✅ Track registration
    trackActivity.register(userData.id);
    
    return { success: true, user: userData };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// In ChatContext.jsx - sendMessage function:
const sendMessage = async (message) => {
  try {
    // ... send message logic
    
    const userId = localStorage.getItem('current_user_id');
    const containsCode = detectCode(message);
    
    // ✅ Track chat activity
    trackActivity.chat(userId, message, containsCode);
    
    // ... rest of the code
  } catch (error) {
    console.error('Error:', error);
  }
};

// In Home.jsx - Fetch real-time stats:
useEffect(() => {
  const fetchStats = () => {
    // ✅ Get real-time stats from tracking
    const realTimeStats = trackActivity.getStats();
    setStats(realTimeStats);
  };

  fetchStats();
  
  // Refresh every 5 seconds for real-time feel
  const interval = setInterval(fetchStats, 5000);
  return () => clearInterval(interval);
}, []);
*/
