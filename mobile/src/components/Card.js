import { StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
    card: {
        shadowColor: '#BBBBBB',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        padding: 16,
        borderRadius: 8,
        rowGap: 24,
        backgroundColor: '#FFF'
    }
})

const Card = ({children}) => {
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}

export default Card;
