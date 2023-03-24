import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useSelector } from "react-redux";
import GoalItem from "../components/goals/GoalItem";
import Card from "../components/UI/Card";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../GlobalColors";

const renderGoalItem = (itemData) => {
  // console.log(itemData.item.);
  return <GoalItem {...itemData.item} />;
};

const GoalsScreen = ({ navigation }) => {
  const goals = useSelector((store) => store.goals.goalList).filter(
    (item) => !item.completed
  );
  const handleAdd = () => {
    navigation.navigate("ManageGoalScreen");
  };
  return (
    <View style={styles.root}>
      <FlatList
        data={goals}
        renderItem={renderGoalItem}
        keyExtractor={(item) => +item.id}
      ></FlatList>
      <View style={styles.addButton}>
        <Pressable onPress={handleAdd}>
          <Ionicons
            name="add-circle-outline"
            size={60}
            color={GlobalColors.colors.primary800}
          ></Ionicons>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    // left: 0,
  },
});
export default GoalsScreen;
