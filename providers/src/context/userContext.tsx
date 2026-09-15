import { createContext, useContext } from "react";
import { User } from "../types/user";

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
}

interface UserProviderProps {
  user: User | null;
  children: React.ReactNode;
}

// Context for user profile info
export const UserContext = createContext<UserContextType | null>(null);

// Context provider
export const UserProvider = ({ user, children }: UserProviderProps) => {
  return (
    <UserContext.Provider value={{ user, isAuthenticated: user !== null }}>
      {children}
    </UserContext.Provider>
  );
};

// To use context
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
