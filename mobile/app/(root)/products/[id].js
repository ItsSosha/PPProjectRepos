import { View, StyleSheet, ScrollView } from "react-native"
import products from "../../../src/utils/productData"
import { useLocalSearchParams } from "expo-router/src/LocationProvider";
import ProductCard from "../../../src/components/ProductList/ProductCard"
import { InterText } from "../../../src/components/CustomText"
import Card from "../../../src/components/Card";
import reviews from "../../../src/utils/Reviews";
import { Rating } from "react-native-rating-element"

const styles = StyleSheet.create({
    specifications: {
        rowGap: 4
    },
    specRow: {
        flexDirection: "row",
    },
    col1: {
        flex: 1,
    },
    col2: {
        flex: 2,
    },
    col3: {
        flex: 3,
    },
    col4: {
        flex: 4,
    },
    reviewHeader: {
        rowGap: 4
    },
    reviewText: {
        padding: 4
    }
});

const Specifications = ({specifications}) => {
    return (
        <View style={styles.specifications}>
            {specifications.map(specification => {
                return (
                    <View style={styles.specRow} key={specification.Key}>
                        <InterText style={styles.col1}>{specification.Key}</InterText>
                        <InterText style={styles.col1}>{specification.Value}</InterText>
                    </View>  
                )
            })}
        </View>
    )
}

const Reviews = ({reviews}) => {
    return (
        <>
            {reviews.map(review => {
                return (
                    <Card key={review.id}>
                        <View style={styles.reviewHeader}>
                            <InterText>
                                {review.user.name}
                            </InterText>
                            <Rating 
                                rated={review.grade}
                                totalCount={5}
                                ratingBackgroundColor="#424551"
                                ratingColor="#F89828"
                                readonly/>
                            <InterText>
                                {review.date.toLocaleDateString()}
                            </InterText>
                        </View>
                        <View style={styles.reviewText}>
                            <InterText>
                                {review.reviewText}
                            </InterText>
                        </View> 
                    </Card>
                )
            })}
        </>
    )
}

const ProductPage = ({route}) => {
    const {id} = useLocalSearchParams();

    const product = products[id];

    return (
        <ScrollView contentContainerStyle={{padding: 24, rowGap: 12}}>
            <ProductCard product={product} />
            <InterText style={{fontWeight: 'semibold', fontSize: 20, marginTop: 16}}>Характеристики</InterText>
            <Card>
                <Specifications specifications={product.specifications} />
            </Card>
            <InterText style={{fontWeight: 'semibold', fontSize: 20, marginTop: 16}}>Відгуки</InterText>
            <Reviews reviews={reviews}/>
        </ScrollView>
    )
}

export default ProductPage;