// AuthContext.ts
import { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app'; // Import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'; // Import the authentication module separately

interface AuthContextProps {
  user: firebase.User | null; // Use firebase.User type for user
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<firebase.User | null>(null); // Use firebase.User type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        // console.log(user)
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
