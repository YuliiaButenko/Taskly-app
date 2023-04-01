import { View, StyleSheet } from "react-native";
import { GlobalColors } from "../../GlobalColors";

const Card = (props) => {
  return <View style={styles.card}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 12,
    padding: 12,
    borderRadius: 9,
    height: "20%",
    alignItems: "center",
    elevation: 4,
    backgroundColor: "white",
    // shadowColor: "#76737350",
    shadowColor: GlobalColors.colors.gray700,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
});

export default Card;
