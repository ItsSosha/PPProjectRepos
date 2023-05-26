import { useLocalSearchParams } from "expo-router/src/LocationProvider";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-rating-element";
import FavouritesService from "../../../src/API/FavouritesService";
import ProductService from "../../../src/API/ProductService";
import Card from "../../../src/components/Card";
import { InterText } from "../../../src/components/CustomText";
import ProductCard from "../../../src/components/ProductList/ProductCard";
import { useAuth } from "../../../src/auth/auth";

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

const Specifications = ({ specifications }) => {
  return (
    <View style={styles.specifications}>
      {specifications.map(specification => {
        return (
          <View style={styles.specRow} key={specification.key}>
            <InterText style={styles.col1}>{specification.key}</InterText>
            <InterText style={styles.col1}>{specification.value}</InterText>
          </View>
        )
      })}
    </View>
  )
}

const Reviews = ({ reviews }) => {
  return (
    <>
      {(reviews.length > 0) ? reviews.map(review => {
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
                readonly />
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
      }) :
      <Text>
        Поки до цього товару відгуків нема 😞
      </Text>}
    </>
  )
}

const ProductPage = ({ route }) => {
  const [product, setProduct] = useState(null);
  const [isFavourite, setFavourite] = useState(false);
  const { id } = useLocalSearchParams();
  const { user } = useAuth();

  async function fetchItem(id) {
    const item = await ProductService.getById(id);
    setProduct(item);
  }

  async function fetchIsFavourite(id, user) {
    const isFavourite = FavouritesService.isOnFavourites(user.jwt, id);
    setFavourite(isFavourite);
  }

  const handleFavouritesPress = async (id, user) => {
    await FavouritesService.updateProductFavourite(id, user.jwt, isFavourite);
    setFavourite(!isFavourite);
  }

  useEffect(() => { 
    fetchItem(id);
    fetchIsFavourite(id, user);
   }, []);

  return (
    (product) ? 
    <ScrollView contentContainerStyle={{ padding: 24, rowGap: 12 }}>
      <ProductCard product={product} isFavourite={isFavourite} handleFavouritesPress={() => handleFavouritesPress(id, user)} fullHeight />
      <InterText style={{ fontWeight: 'semibold', fontSize: 20, marginTop: 16 }}>Характеристики</InterText>
      <Card>
        <Specifications specifications={product.rawItem.specifications} />
      </Card>
      <InterText style={{ fontWeight: 'semibold', fontSize: 20, marginTop: 16 }}>Відгуки</InterText>
      <Reviews reviews={product.reviews} />
    </ScrollView> :
    <View>
      <Text>
        Loading...
      </Text>
    </View>
  )
}

export default ProductPage;