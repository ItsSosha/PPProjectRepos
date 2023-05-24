import { useRouter, useSegments } from "expo-router";
import { useState, useEffect, useContext, createContext, useRef } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import JWT from "expo-jwt";
import UserService from "../API/UserService";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

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
      router.replace(`/users/${user.id}/about`);
    }
  }, [user, segments]);
}

WebBrowser.maybeCompleteAuthSession();

export function AuthProvider(props) {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "831759783769-3r713gngbaj289trqp2s5gi14jg3fu90.apps.googleusercontent.com",
    iosClientId:
      "831759783769-enuge94e6vvdtmsqjhednlqn4uv9rkhh.apps.googleusercontent.com",
    webClientId:
      "831759783769-kk9ctot22okj9rv0l6sl65oeig8t4bt2.apps.googleusercontent.com",
    expoClientId:
      "831759783769-kk9ctot22okj9rv0l6sl65oeig8t4bt2.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      console.log(response);
      getUserInfo().then(setUser);
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

      const googleUser = await response.json();
      const key = "an exceptionally secret key";
      const jwt = JWT.encode(googleUser, key, { algorithm: "HS256" });

      let user = await UserService.getUserSubscription(jwt);

      const notificationToken = await registerForPushNotificationsAsync();

      if (user.notificationToken !== notificationToken) {
        await UserService.setNotificationToken(user.jwt, notificationToken);
        user = await UserService.get(user.jwt);
      }

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const itemId = response.notification.request.content.data.itemId;
          router.replace(`/products/${itemId}`);
        });

      return user;
    } catch (error) {
      return null;
    }
  };

  useProtectedRoute(user);

  useEffect(() => {
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}
