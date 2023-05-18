import { Slot } from "expo-router";
import { AuthProvider } from "../src/auth/auth";
import { useFonts } from "expo-font"

export default function Layout() {

  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter-VariableFont_wght.ttf"),
    Manrope: require("../assets/fonts/Manrope-VariableFont_wght.ttf")
  })

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}