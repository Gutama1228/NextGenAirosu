// ==================== src/services/tracking.js ====================
// Real-time activity tracking system

/**
 * Activity Tracking Service
 * Tracks real user activities and updates stats in real-time
 */

// Initialize tracking database (in production, this would be a real database)
const TRACKING_KEY = 'activity_tracking';
const ONLINE_USERS_KEY = 'online_users';
const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes

// Initialize tracking data structure
const initializeTracking = () => {
  const existing = localStorage.getItem(TRACKING_KEY);
  if (!existing) {
    const initialData = {
      totalUsers: 0,
      activeUsers: 0,
      totalChats: 0,
      codeSnippets: 0,
      userRating: 4.9,
      ratings: [],
      registeredUsers: [],
      chatSessions: [],
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(TRACKING_KEY, JSON.stringify(initialData));
  }
};

initializeTracking();

// Get current tracking data
export const getTrackingData = () => {
  const data = localStorage.getItem(TRACKING_KEY);
  return data ? JSON.parse(data) : null;
};

// Update tracking data
const updateTrackingData = (updates) => {
  const current = getTrackingData();
  const updated = {
    ...current,
    ...updates,
    lastUpdated: new Date().toISOString()
  };
  localStorage.setItem(TRACKING_KEY, JSON.stringify(updated));
  return updated;
};

// ==================== USER TRACKING ====================

/**
 * Track new user registration
 * Called when user successfully registers
 */
export const trackUserRegistration = (userId, userData) => {
  const tracking = getTrackingData();
  
  // Add to registered users list
  const newUser = {
    id: userId,
    ...userData,
    registeredAt: new Date().toISOString()
  };
  
  const updatedUsers = [...tracking.registeredUsers, newUser];
  
  updateTrackingData({
    totalUsers: updatedUsers.length,
    registeredUsers: updatedUsers
  });
  
  // Also track as active user
  trackActiveUser(userId);
  
  console.log(`✅ New user registered: ${userId}. Total users: ${updatedUsers.length}`);
};

/**
 * Track active user (user who just logged in or is actively using the site)
 * Called on login, page load, or user activity
 */
export const trackActiveUser = (userId) => {
  const onlineUsers = getOnlineUsers();
  const now = Date.now();
  
  // Add or update user's last activity time
  onlineUsers[userId] = now;
  
  // Clean up inactive users (not active for more than SESSION_TIMEOUT)
  const activeUsers = Object.entries(onlineUsers)
    .filter(([_, lastActive]) => now - lastActive < SESSION_TIMEOUT)
    .reduce((acc, [id, time]) => ({ ...acc, [id]: time }), {});
  
  localStorage.setItem(ONLINE_USERS_KEY, JSON.stringify(activeUsers));
  
  // Update active users count
  updateTrackingData({
    activeUsers: Object.keys(activeUsers).length
  });
  
  return Object.keys(activeUsers).length;
};

/**
 * Get currently online users
 */
const getOnlineUsers = () => {
  const data = localStorage.getItem(ONLINE_USERS_KEY);
  return data ? JSON.parse(data) : {};
};

/**
 * Track user logout
 */
export const trackUserLogout = (userId) => {
  const onlineUsers = getOnlineUsers();
  delete onlineUsers[userId];
  localStorage.setItem(ONLINE_USERS_KEY, JSON.stringify(onlineUsers));
  
  updateTrackingData({
    activeUsers: Object.keys(onlineUsers).length
  });
};

// ==================== CHAT TRACKING ====================

/**
 * Track chat message sent
 * Called every time user sends a message
 */
export const trackChatMessage = (userId, messageData) => {
  const tracking = getTrackingData();
  
  const chatSession = {
    id: Date.now(),
    userId,
    message: messageData.message,
    category: messageData.category,
    timestamp: new Date().toISOString()
  };
  
  const updatedSessions = [...tracking.chatSessions, chatSession];
  
  updateTrackingData({
    totalChats: updatedSessions.length,
    chatSessions: updatedSessions
  });
  
  console.log(`💬 Chat tracked: ${userId}. Total chats: ${updatedSessions.length}`);
  
  return updatedSessions.length;
};

/**
 * Track code snippet generated
 * Called when AI response contains code blocks
 */
export const trackCodeGeneration = (userId, codeData) => {
  const tracking = getTrackingData();
  
  const newCount = tracking.codeSnippets + 1;
  
  updateTrackingData({
    codeSnippets: newCount
  });
  
  console.log(`🔧 Code generated: ${userId}. Total code snippets: ${newCount}`);
  
  return newCount;
};

// ==================== RATING TRACKING ====================

/**
 * Track user rating
 * Called when user submits a rating
 */
export const trackUserRating = (userId, rating) => {
  const tracking = getTrackingData();
  
  const newRating = {
    userId,
    rating: parseFloat(rating),
    timestamp: new Date().toISOString()
  };
  
  const updatedRatings = [...tracking.ratings, newRating];
  
  // Calculate average rating
  const totalRating = updatedRatings.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = (totalRating / updatedRatings.length).toFixed(1);
  
  updateTrackingData({
    userRating: parseFloat(avgRating),
    ratings: updatedRatings
  });
  
  console.log(`⭐ Rating tracked: ${rating}. Average: ${avgRating}`);
  
  return parseFloat(avgRating);
};

// ==================== STATS RETRIEVAL ====================

/**
 * Get real-time stats
 * This is what the homepage will call
 */
export const getRealTimeStats = () => {
  // Clean up inactive users before returning stats
  const userId = localStorage.getItem('current_user_id');
  if (userId) {
    trackActiveUser(userId);
  }
  
  const tracking = getTrackingData();
  
  return {
    totalUsers: tracking.totalUsers,
    activeUsers: tracking.activeUsers,
    totalChats: tracking.totalChats,
    codeSnippets: tracking.codeSnippets,
    userRating: tracking.userRating,
    lastUpdated: tracking.lastUpdated
  };
};

/**
 * Get detailed analytics
 */
export const getDetailedAnalytics = () => {
  const tracking = getTrackingData();
  const onlineUsers = getOnlineUsers();
  
  return {
    overview: {
      totalUsers: tracking.totalUsers,
      activeUsers: Object.keys(onlineUsers).length,
      totalChats: tracking.totalChats,
      codeSnippets: tracking.codeSnippets,
      userRating: tracking.userRating,
      avgResponseTime: 1.2
    },
    recentUsers: tracking.registeredUsers.slice(-10).reverse(),
    recentChats: tracking.chatSessions.slice(-10).reverse(),
    ratingDistribution: calculateRatingDistribution(tracking.ratings)
  };
};

// Helper function to calculate rating distribution
const calculateRatingDistribution = (ratings) => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  ratings.forEach(r => {
    const rounded = Math.round(r.rating);
    distribution[rounded]++;
  });
  return distribution;
};

// ==================== AUTO CLEANUP ====================

/**
 * Periodically clean up inactive users
 * Should be called on app initialization
 */
export const startActivityMonitoring = () => {
  // Clean up inactive users every minute
  setInterval(() => {
    const userId = localStorage.getItem('current_user_id');
    if (userId) {
      trackActiveUser(userId);
    }
  }, 60000); // 1 minute
  
  console.log('🔄 Activity monitoring started');
};

// ==================== RESET (FOR TESTING) ====================

/**
 * Reset all tracking data (USE WITH CAUTION)
 */
export const resetTracking = () => {
  if (window.confirm('Reset all tracking data? This cannot be undone!')) {
    localStorage.removeItem(TRACKING_KEY);
    localStorage.removeItem(ONLINE_USERS_KEY);
    initializeTracking();
    console.log('🔄 Tracking data reset');
  }
};
