import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * @interface User
 * @description Defines the structure of a user object.
 */
export interface User {
  id: string;
  name: string;
  town: string;
  phone: string;
}

/**
 * @interface UserDataContextType
 * @description Defines the shape of the User Data Context.
 */
interface UserDataContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

/**
 * @constant UserDataContext
 * @description React Context for managing user data.
 */
export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

/**
 * @interface UserDataProviderProps
 * @description Props for the UserDataProvider component.
 */
interface UserDataProviderProps {
  children: ReactNode;
}

/**
 * @function UserDataProvider
 * @description Provides user data and loading state to its children components.
 * @param {UserDataProviderProps} { children }
 */
export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Initial loading state

  // In a real application, you would fetch user data here
  // For now, we'll just set loading to false after a short delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100); // Simulate a network request
    return () => clearTimeout(timer);
  }, []);

  return (
    <UserDataContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

/**
 * @function useUser
 * @description Custom hook for consuming the UserDataContext.
 * @returns {UserDataContextType} The user data context.
 * @throws {Error} If used outside of a UserDataProvider.
 */
export const useUser = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserDataProvider');
  }
  return context;
};
