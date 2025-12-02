import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

/**
 * Custom hook to use Chat Context
 * @returns {Object} Chat context value
 * @throws {Error} If used outside ChatProvider
 */
export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  return context;
};

export default useChat;
