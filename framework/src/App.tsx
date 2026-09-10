import {
  AuthorizationProvider,
  ThemeProvider,
  UserProvider,
} from "@tis-lab/context-providers";
import { CohortBuilder } from "@tis-lab/study-palette-ui";

import { mockUser } from "./mock/mockUser";

function App() {
  const user = mockUser;

  return (
    <UserProvider user={user}>
      <AuthorizationProvider>
        <ThemeProvider>
          <CohortBuilder />
          <h1>Hello</h1>
        </ThemeProvider>
      </AuthorizationProvider>
    </UserProvider>
  );
}

export default App;
