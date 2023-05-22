import { useRouter, useSegments } from "expo-router";
import { useState, useEffect, useContext, createContext } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import JWT from 'expo-jwt';

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

WebBrowser.maybeCompleteAuthSession();

export function AuthProvider(props) {
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "831759783769-3r713gngbaj289trqp2s5gi14jg3fu90.apps.googleusercontent.com",
    iosClientId: "831759783769-enuge94e6vvdtmsqjhednlqn4uv9rkhh.apps.googleusercontent.com",
    webClientId: "831759783769-kk9ctot22okj9rv0l6sl65oeig8t4bt2.apps.googleusercontent.com",
    expoClientId: "831759783769-kk9ctot22okj9rv0l6sl65oeig8t4bt2.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Can't fetch user info");
      }

      const user = await response.json();

      const key = "an exceptionally secret key";
      const jwt = JWT.encode(user, key, { algorithm: "HS256" });
      console.log(jwt);

      setUser(user);
    } catch (error) {
      console.log(error)
      setUser(null);
    }
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: promptAsync,
        signOut: () => setUser(null),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}