import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import Card from "../UI/Card";

const TaskItem = (item) => {
  //   console.log(item);

  return (
    // <Card>
    <View style={{ height: "100%", flex: 1 }}>
      <Text style={styles.text}>{item.title} hey</Text>
      {item?.description.trim() !== "" && <Text>{item.description}</Text>}
      <Text>{item.duration}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
});

export default TaskItem;
