import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../src/auth/auth";

const styles = StyleSheet.create(
  {
    typography: {
      loginHeading: {
        fontSize: 20,
        fontWeight: 600
      },
      buttonText: {
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
      }
    },
    components: {
      buttonContainer: {
        backgroundColor: "#764abc",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 12,
        marginTop: 20
      }
    }
  }
)

export default function SignIn() {
  const { signIn } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.typography.loginHeading}>
        You are not logged in
      </Text>
      <TouchableOpacity
        style={styles.components.buttonContainer}
        onPress={async () => await signIn()}
      >
        <Text style={styles.typography.buttonText}>
          Continue with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}