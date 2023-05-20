import { useRouter, useSegments } from "expo-router";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      router.replace("/users/0/about");
    }
  }, [user, segments]);
}

export function AuthProvider(props) {
  const [user, setAuth] = useState(null);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setAuth({}),
        signOut: () => setAuth(null),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}