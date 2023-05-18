import { Text } from "react-native"

const ManropeText = (props) => {
    return <Text style={{...props.style, fontFamily: "Manrope"}} {...props}>{props.children}</Text>;
}

export default ManropeText;