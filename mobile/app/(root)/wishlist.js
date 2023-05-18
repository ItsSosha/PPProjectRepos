import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Pressable, View } from "react-native";



const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
})

const AnotherPage = (props) => {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Another page</Text>
        <Link href="/" asChild>
            <Pressable>
                <Text>To index</Text>
            </Pressable>
        </Link>
    </View>
  )
};

export default AnotherPage;