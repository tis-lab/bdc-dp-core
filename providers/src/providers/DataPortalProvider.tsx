import { AuthorizationProvider } from "../context/authorizationContext";
import { ThemeProvider } from "./ThemeProvider";
import { UserProvider } from "../context/userContext";
import { User } from "../types/user";

interface DataPortalProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export function DataPortalProvider({
  user,
  children,
}: DataPortalProviderProps) {
  return (
    <UserProvider user={user}>
      <AuthorizationProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthorizationProvider>
    </UserProvider>
  );
}
