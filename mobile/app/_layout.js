import { Slot } from "expo-router";
import { AuthProvider } from "../src/auth/auth";

export default function Layout() {

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}