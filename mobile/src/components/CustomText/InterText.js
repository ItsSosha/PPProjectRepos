import { Text } from "react-native"

const InterText = (props) => {
    return <Text style={{...props.style, fontFamily: "Inter"}} {...props}>{props.children}</Text>;
}

export default InterText;