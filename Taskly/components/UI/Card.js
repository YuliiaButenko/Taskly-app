import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return <View style={styles.card}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 12,
    padding: 12,
    borderRadius: 9,
    backgroundColor: "white",
    height: "20%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "#76737350",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
});

export default Card;
