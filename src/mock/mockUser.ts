import type { User } from "../types/user";

export const mockUser: User = {
  uuid: "test-user-001",
  profile: {
    email: "xxx@xxx.com",
    firstName: "Jane",
    lastName: "Doe",
    phone: "000-000-0000",
    addressStreet: "0000 xx Street",
    addressCity: "City",
    addressState: "State",
    postalCode: "00000",
    country: "US",
  },
  preferences: {
    theme: "dark",
  },
};
