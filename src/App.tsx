import { AuthorizationProvider } from "./context/authorizationContext";
import { ThemeProvider } from "./context/themeContext";
import { UserProvider } from "./context/userContext";
import { mockUser } from "./mock/mockUser";
import { CohortBuilder } from "@tis-lab/study-palette-ui";

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
