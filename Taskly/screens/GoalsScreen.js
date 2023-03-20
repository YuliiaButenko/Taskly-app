import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import GoalItem from "../components/goals/GoalItem";
import Card from "../components/UI/Card";

function renderGoalItem(itemData) {
  // console.log(itemData.item.);
  return <GoalItem {...itemData.item} />;
}

const GoalsScreen = () => {
  const goals = useSelector((store) => store.goals.goalList);
  return (
    <View style={styles.root}>
      <FlatList
        data={goals}
        renderItem={renderGoalItem}
        keyExtractor={(item) => +item.id}
      >
        {/* <GoalItem /> */}
      </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
export default GoalsScreen;
