import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import FavouritesService from "../../../../src/API/FavouritesService";
import { useAuth } from "../../../../src/auth/auth";
import ProductList from "../../../../src/components/ProductList/ProductList";
import { useIsFocused } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    // flex: 1
  },
  loadMoreBtn: {
    width: '60%',
    backgroundColor: '#56B280',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  favouritesButton: {
    add: {
      backgroundColor: "transparent",
      borderColor: "#56B280",
      borderRadius: 10,
      borderWidth: 2,
      color: "#56B280"
    },
    remove: {
      backgroundColor: "#56B280",
      borderColor: "#56B280",
      borderRadius: 10,
      borderWidth: 2,
      color: "#FFF"
    }
  },
  emptyListHeading: {
    marginTop: 10,
    fontSize: 20
  }
})

const PER_PAGE = 4;

const Wishlist = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [loadedMore, setLoadedMore] = useState(1);
  const isFocused = useIsFocused();

  async function fetchFavourites(user) {
    try {
      const {result: fetched } = await FavouritesService.getAll(user.id, (loadedMore - 1) * PER_PAGE, PER_PAGE);
      const favourites = fetched.map(userItem => userItem.item);
      setFavourites(favourites);

    } catch (error) {
      console.log(error);
    }
  }

  const { user } = useAuth();
  useEffect(() => { fetchFavourites(user) }, [loadedMore, isFocused]);
  
  const handleFavouritesPress = async (id, user) => {
    setFavourites(favourites.filter(item => item.id != id))
    await FavouritesService.updateProductFavourite(id, user.jwt, true);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      {(favourites.length > 0) ? 
      <>
      <ProductList products={favourites} handleFavouritesPress={handleFavouritesPress} user={user} />
      <TouchableOpacity onPress={() => setLoadedMore(prevLoadedMore => prevLoadedMore + 1)} style={styles.loadMoreBtn}>
        <Text style={{ color: "#FFF" }}>
          Load more
        </Text>
      </TouchableOpacity>
      </> :
      <Text style={styles.emptyListHeading}>
        Поки Ваш список бажаного пустий 😞
      </Text>
      }
    </ScrollView>
  )
};

export default Wishlist;