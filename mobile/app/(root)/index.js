import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { useAuth } from "../../src/auth/auth";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
})

const Home = (props) => {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Profile page</Text>
      <Link href="/wishlist" asChild>
        <Pressable>
          <Text>To wishlist</Text>
        </Pressable>
      </Link>
      <Text onPress={() => signOut()}>Sign Out</Text>
    </View>
  )
};

export default Home;