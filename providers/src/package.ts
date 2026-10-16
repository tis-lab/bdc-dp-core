// this file serves as the entry point for package
export {
  useUserContext,
  UserProvider,
  type UserContextType,
} from "./context/userContext";
export {
  useAuthorizationContext,
  AuthorizationProvider,
} from "./context/authorizationContext";
export { ThemeProvider } from "./providers/ThemeProvider";

export type { User, UserProfile, UserPreferences } from "./types/user";
export type { DatasetAccessResult } from "./types/authorization";

export { DataPortalProvider } from "./providers/DataPortalProvider";

export { default as FancyButton } from "./shared-components/FancyButton";
export type {
  FancyButtonProps,
  FancyButtonAppearance,
  FancyButtonSize,
  FancyButtonColor,
} from "./shared-components/FancyButton";
