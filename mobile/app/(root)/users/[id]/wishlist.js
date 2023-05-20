import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Pressable, View } from "react-native";
import ProductList from "../../../../src/components/ProductList/ProductList";
import { ScrollView } from "react-native-gesture-handler";
import productsData from "../../../../src/utils/productData";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
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
})

const AnotherPage = (props) => {
  
  const [products, setProducts] = useState(JSON.parse(JSON.stringify(productsData)));
  const [loadedMore, setLoadedMore] = useState(1);

  const handleLoadMore = () => {
    setLoadedMore(prevLoadedMore => prevLoadedMore + 1);

    const dataCopy = JSON.parse(JSON.stringify(productsData));

    dataCopy.forEach((elem, index, arr) => {
      arr[index].id = arr[index].id + 4 * loadedMore;
    })

    setProducts([...products, ...dataCopy]);
  }



  return (
    <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="auto" />
        {/* <Text>Another page</Text>
        <Link href="/" asChild>
            <Pressable>
                <Text>To index</Text>
            </Pressable>
        </Link> */}
        <ProductList products={products}/>
        <TouchableOpacity onPress={handleLoadMore} style={styles.loadMoreBtn}>
          <Text style={{color: "#FFF"}}>
            Load more
          </Text>
        </TouchableOpacity>
    </ScrollView>
  )
};

export default AnotherPage;