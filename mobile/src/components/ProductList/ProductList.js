import ProductCard from "./ProductCard";
import { View } from "react-native";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProductList = ({ products, handleFavouritesPress, user }) => {

  return (
    <View style={{ flex: 1, padding: 24, rowGap: 24 }}>
      {products.map(product => {
        return (
          <Link key={product.id} href={{ pathname: '/products/[id]', params: { id: product.id } }} asChild>
            <TouchableOpacity>
              <ProductCard 
                product={product}
                handleFavouritesPress={() => handleFavouritesPress(product.id, user)}
                isFavourite={true}   
              />
            </TouchableOpacity>
          </Link>
        )
      })}
    </View>
  )
}

export default ProductList;