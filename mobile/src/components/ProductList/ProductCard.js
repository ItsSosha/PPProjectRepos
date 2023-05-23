import { View, Image, StyleSheet } from "react-native"
import Card from "../Card";
import { InterText, ManropeText } from "../CustomText";
import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: 140,
    resizeMode: 'contain',
  },
  cardContent: {
    padding: 8,
    rowGap: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 500
  },
  cardPrice: {
    flexDirection: 'row',
    columnGap: 4
  },
  cardPriceCurrent: {
    fontSize: 20,
    fontWeight: 700,
    color: "#56B280"
  },
  cardPriceOld: {
    fontSize: 16,
    alignSelf: 'flex-end',
    fontWeight: 500,
    textDecorationLine: 'line-through',
    color: "#56B280"
  },
  favouritesButton: {
    add: {
      backgroundColor: "transparent",
      borderColor: "#56B280",
      borderRadius: 10,
      borderWidth: 2,
      textAlign: "center",
      paddingVertical: 5,
      paddingHorizontal: 30
    },
    remove: {
      backgroundColor: "#56B280",
      borderColor: "#56B280",
      borderRadius: 5,
      borderWidth: 2,
      textAlign: "center",
      paddingVertical: 5,
      paddingHorizontal: 30
    }
  },
  productInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  }
});

const ProductCard = ({ product, fullHeight, handleFavouritesPress, isFavourite }) => {
  return (
    <Card>
      <Image style={styles.cardImage} source={{ uri: product.rawItem.rawIconURL }} />
      <View style={styles.cardContent}>
        <InterText style={styles.cardTitle} numberOfLines={fullHeight ? 0 : 3}>{product.rawItem.name}</InterText>
        <View style={styles.productInfoContainer}>
          <View style={styles.cardPrice}>
            <ManropeText style={styles.cardPriceCurrent}>
              {product.rawItem.rawPrice}₴
            </ManropeText>
            {(product.rawItem.oldPrice) ? 
            <ManropeText style={styles.cardPriceOld}>
              {product.rawItem.oldPrice}₴
            </ManropeText> : 
            null}
          </View>
          <TouchableOpacity
            style={(isFavourite) ? styles.favouritesButton.remove : styles.favouritesButton.add}
            onPress={handleFavouritesPress}
          >
            {(isFavourite) ?
            <Ionicons name="star" color="#FFF" size={20} /> :
            <Ionicons name="star-outline" color="#56B280" size={20} />
            }
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  )
}

export default ProductCard;