"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getUserById } from "@/app/actions/user";

interface User {
  id: string;
  name: string;
  town: string;
  phone: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const UserDataContext = createContext<UserContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        const fetchedUser = await getUserById(storedUserId);
        if (fetchedUser) {
          const validatedUser: User = {
            id: String(fetchedUser.id), 
            name: fetchedUser.name,
            town: fetchedUser.town || "", 
            phone: fetchedUser.phone || "", 
          };
          setUser(validatedUser);
        } else {
          localStorage.removeItem("userId"); // Clear invalid userId
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  return (
    <UserDataContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserDataProvider");
  }
  return context;
};