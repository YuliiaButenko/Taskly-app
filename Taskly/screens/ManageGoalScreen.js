import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { goalsActions } from "../store/goalsSlice";
import { GlobalColors } from "../GlobalColors";
import GoalForm from "../components/goals/GoalForm";
import IconButton from "../components/UI/IconButton";

const ManageGoalScreen = ({ route, navigation }) => {
  const goals = useSelector((store) => store.goals.goalList);
  const editedGoalId = route.params?.id;
  const selectedGoal = goals.find((goal) => goal.id === editedGoalId);
  const isEditing = !!editedGoalId;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Goal" : "Add Goal",
    });
  }, [navigation, isEditing]);

  const deleteGoalHandler = () => {
    console.log(editedGoalId);
    dispatch(goalsActions.deleteGoal(editedGoalId));
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (goalData) => {
    console.log(isEditing);
    if (isEditing) {
      dispatch(goalsActions.changeInputs(goalData));
    } else {
      dispatch(goalsActions.addGoal(goalData));
    }
    if (goalData.completed === true) {
      Alert.alert(`Congrats! Your goal: "${goalData.title}" is completed!`);
    }
    navigation.goBack();
  };

  return (
    // <View style={styles.container}>
    <ScrollView style={styles.container}>
      <GoalForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedGoal}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalColors.colors.primary800}
            size={36}
            onPress={deleteGoalHandler}
          />
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalColors.colors.primary500,
  },
  deleteContainer: {
    marginTop: 16,
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalColors.colors.primary200,
    alignItems: "center",
  },
});
export default ManageGoalScreen;
