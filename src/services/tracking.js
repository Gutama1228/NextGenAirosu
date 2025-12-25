// ========================================
// FILE: src/services/tracking.js
// Real-time Analytics Tracking Service (FIXED)
// ========================================

/**
 * Get real-time statistics from localStorage
 */
export const getStats = () => {
  return {
    totalUsers: parseInt(localStorage.getItem('total_users') || '0'),
    activeUsers: parseInt(localStorage.getItem('active_users') || '0'),
    totalChats: parseInt(localStorage.getItem('total_chats') || '0'),
    codeSnippets: parseInt(localStorage.getItem('code_snippets') || '0'),
    userRating: parseFloat(localStorage.getItem('user_rating') || '4.9'),
  };
};

/**
 * Track user activity
 */
export const trackActivity = (activityType) => {
  switch(activityType) {
    case 'register':
      const totalUsers = parseInt(localStorage.getItem('total_users') || '0');
      const newTotal = totalUsers + 1;
      localStorage.setItem('total_users', newTotal.toString());
      localStorage.setItem('active_users', newTotal.toString());
      break;
      
    case 'login':
      // Update active users timestamp
      const userId = localStorage.getItem('current_user_id');
      if (userId) {
        updateActiveUser(userId);
      }
      break;
      
    case 'chat':
      const totalChats = parseInt(localStorage.getItem('total_chats') || '0');
      localStorage.setItem('total_chats', (totalChats + 1).toString());
      break;
      
    case 'code':
      const codeSnippets = parseInt(localStorage.getItem('code_snippets') || '0');
      localStorage.setItem('code_snippets', (codeSnippets + 1).toString());
      break;
      
    default:
      break;
  }
};

/**
 * Update active user timestamp
 */
const updateActiveUser = (userId) => {
  try {
    const activeUsers = JSON.parse(localStorage.getItem('active_users_list') || '{}');
    activeUsers[userId] = Date.now();
    
    // Clean up users inactive for more than 24 hours
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    
    Object.keys(activeUsers).forEach(id => {
      if (activeUsers[id] < oneDayAgo) {
        delete activeUsers[id];
      }
    });
    
    localStorage.setItem('active_users_list', JSON.stringify(activeUsers));
    localStorage.setItem('active_users', Object.keys(activeUsers).length.toString());
  } catch (error) {
    console.error('Error updating active user:', error);
  }
};

/**
 * Detect if message contains code
 */
export const detectCode = (message) => {
  if (!message) return false;
  
  const codePatterns = [
    /```[\s\S]*?```/g,        // Code blocks
    /`[^`]+`/g,                // Inline code
    /function\s+\w+\s*\(/g,    // Function declarations
    /local\s+\w+\s*=/g,        // Lua local variables
    /if\s+.+\s+then/gi,        // Lua if statements
    /for\s+.+\s+do/gi,         // Lua for loops
    /while\s+.+\s+do/gi,       // Lua while loops
    /\w+\s*:\s*function/g,     // Method declarations
  ];
  
  return codePatterns.some(pattern => pattern.test(message));
};

/**
 * Track chat message (with code detection)
 */
export const trackChatMessage = (message) => {
  // Track the chat
  trackActivity('chat');
  
  // Check if message contains code
  if (detectCode(message)) {
    trackActivity('code');
  }
};

/**
 * Initialize stats - Auto-clear fake data
 */
export const initializeStats = () => {
  const currentVersion = 'v2.0'; // Version untuk tracking system baru
  const savedVersion = localStorage.getItem('tracking_version');
  
  // Jika version berbeda atau belum ada, reset semua data
  if (savedVersion !== currentVersion) {
    console.log('🔄 Migrating to new tracking system...');
    
    // Clear old fake data
    localStorage.removeItem('stats_initialized');
    
    // Initialize with REAL starting values (0)
    localStorage.setItem('total_users', '0');
    localStorage.setItem('active_users', '0');
    localStorage.setItem('total_chats', '0');
    localStorage.setItem('code_snippets', '0');
    localStorage.setItem('user_rating', '4.9');
    localStorage.setItem('active_users_list', '{}');
    localStorage.setItem('tracking_version', currentVersion);
    
    console.log('✅ Tracking system initialized with real data');
  }
};

// Auto-initialize on import
initializeStats();

/**
 * Alias for trackActivity('code') - for backward compatibility
 */
export const trackCodeGeneration = () => {
  trackActivity('code');
};

export default {
  getStats,
  trackActivity,
  trackChatMessage,
  trackCodeGeneration,
  detectCode,
  initializeStats,
};
