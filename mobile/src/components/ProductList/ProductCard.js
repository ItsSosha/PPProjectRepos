import { View, Image, StyleSheet } from "react-native"
import Card from "../Card";
import { InterText, ManropeText } from "../CustomText";
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
    }
});

const ProductCard = ({product, fullHeight}) => {
    return (
        <Card>
            <Image style={styles.cardImage} source={{uri: product.rawIconURL}}/>
            <View style={styles.cardContent}>
                <InterText style={styles.cardTitle} numberOfLines={fullHeight ? 0 : 3}>{product.name}</InterText>
                <View style={styles.cardPrice}>
                    <ManropeText style={styles.cardPriceCurrent}>{product.rawPrice}₴</ManropeText>
                    {product.oldPrice ? <ManropeText style={styles.cardPriceOld}>{product.oldPrice}₴</ManropeText> : null}
                </View>
            </View>
        </Card>
    )
}

export default ProductCard;