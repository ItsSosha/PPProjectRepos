import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Text, View } from "react-native";
import { useAuth } from "../../auth/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomDrawer = (props) => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{
        padding: 20,
        borderTopColor: "#CCC",
        borderTopWidth: 1
      }}>
        <TouchableOpacity onPress={signOut}>
          <Text>
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default CustomDrawer;

