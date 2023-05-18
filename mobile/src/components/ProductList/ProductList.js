import { useRouter } from "expo-router";
import ProductCard from "./ProductCard";
import { View } from "react-native";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProductList = ({products}) => {

    const router = useRouter();

    // const handleCardPress = (id) => {
    //     router.replace(`/products/${id}`);
    // }

    return (
        <View style={{flex: 1, padding: 24, rowGap: 24}}>
            {products.map(product => {
                return (
                    <Link key={product.id} href={{pathname: '/products/[id]', params: {id: product.id}}} asChild>
                        <TouchableOpacity>
                            <ProductCard product={product} />
                        </TouchableOpacity>
                    </Link>
                )
            })}
        </View>
    )
}

export default ProductList;