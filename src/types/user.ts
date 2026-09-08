interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  postalCode: string;
  country: string;
}

interface UserPreferences {
  theme?: "light" | "dark";
  // Add other preferences as they are defined
}

export interface User {
  uuid: string;
  profile: UserProfile;
  preferences: UserPreferences;
}
