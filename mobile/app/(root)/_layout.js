import { Drawer } from "expo-router/drawer";
import CustomDrawer from "../../src/components/CustomDrawer/CustomDrawer";

const RootLayout = (props) => {

  return (
    <Drawer drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Your profile",
          title: "Your profile"
        }}
      />
      <Drawer.Screen
        name="wishlist"
        options={{
          drawerLabel: "Wishlist",
          title: "Wishlist"
        }}
      />
    </Drawer>
  )
};

export default RootLayout;
