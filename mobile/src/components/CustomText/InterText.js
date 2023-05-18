import { Text } from "react-native"

const InterText = (props) => {
    return <Text style={{...props.style, fontFamily: "Inter"}}>{props.children}</Text>;
}

export default InterText;