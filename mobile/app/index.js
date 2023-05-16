import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";



const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }
})

const Home = (props) => {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Aight imma head out 🤒</Text>
    </View>
  )
};

export default Home;