import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";
import GlobalStyles from "./globalStyles";
import { Router } from "./routes/Router";
import { AuthProvider } from './AuthContext';

const queryClient = new QueryClient();

const App = (): ReactElement => {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>

      </QueryClientProvider>
    </>
  );
};

export default App;
