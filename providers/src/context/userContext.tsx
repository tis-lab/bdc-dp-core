import { createContext, useContext, useMemo } from "react";
import { User, UserPreferences } from "../types/user";

export interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  /** Ask the owner of the session to change preferences. No-op if the owner didn't provide a handler. */
  updatePreferences: (changes: Partial<UserPreferences>) => void;
}

interface UserProviderProps {
  user: User | null;
  /** Called when a consumer asks to change preferences. The owner updates `user` in response. */
  onUpdatePreferences?: (changes: Partial<UserPreferences>) => void;
  children: React.ReactNode;
}

const noop = () => {};

// Context for user profile info
export const UserContext = createContext<UserContextType | null>(null);

// Context provider
export const UserProvider = ({
  user,
  onUpdatePreferences,
  children,
}: UserProviderProps) => {
  const value = useMemo<UserContextType>(
    () => ({
      user,
      isAuthenticated: user !== null,
      updatePreferences: onUpdatePreferences ?? noop,
    }),
    [user, onUpdatePreferences],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// To use context
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
