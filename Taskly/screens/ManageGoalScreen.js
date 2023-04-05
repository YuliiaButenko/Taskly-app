import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import GoalForm from "../components/goals/GoalForm";
import IconButton from "../components/UI/IconButton";
import { deleteGoal } from "../store/goals-actions";
import { updateTask } from "../store/tasks-actions";
import { fetchTasksDataByUserId } from "../store/tasks-actions";
import { createGoal, fetchGoalsDataByUserId } from "../store/goals-actions";
import { sendGoalsData } from "../store/goals-actions";

const ManageGoalScreen = ({ route, navigation }) => {
  const goals = useSelector((store) => store.goals.goalList);
  const tasks = useSelector((store) => store.tasks.taskList);
  const user = useSelector((state) => state.auth.user);
  const editedGoalId = route.params?.id;
  const colorTheme = route.params?.colorTheme;
  const selectedGoal = goals.find((goal) => goal.id === editedGoalId);
  const isEditing = !!editedGoalId;
  const dispatch = useDispatch();
  const goalChanged = useSelector((state) => state.goals.changed);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Goal" : "Add Goal",
    });
    dispatch(fetchGoalsDataByUserId(user.id));
    dispatch(fetchTasksDataByUserId(user.id));
  }, [navigation, isEditing, dispatch, user.id]);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const handleRemoveItem = () => {
    const newTasks = tasks.filter(
      (item) => item?.goal && item?.goal.title === selectedGoal.title
    );
    //can't remove goal item unless task.goal is null
    newTasks.map((item) => {
      return dispatch(
        updateTask({ ...item, id: item.id, goal: null, user: null })
      );
    });
    dispatch(deleteGoal(selectedGoal));

    navigation.goBack();
  };

  const confirmHandler = (goalData) => {
    if (isEditing) {
      dispatch(sendGoalsData(goalData));
    } else {
      dispatch(createGoal(goalData));
    }
    if (goalData.completed === true) {
      Alert.alert(`Congrats! Your goal: "${goalData.title}" is completed!`);
    }
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colorTheme.primary500 }]}
    >
      <KeyboardAvoidingView behavior="padding">
        <GoalForm
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
          defaultValues={selectedGoal}
          colorTheme={colorTheme}
        />
        {isEditing && (
          <View
            style={[
              styles.deleteContainer,
              { borderTopColor: colorTheme.primary700 },
            ]}
          >
            <IconButton
              icon="trash"
              color={colorTheme.primary900}
              size={36}
              onPress={handleRemoveItem}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 2,
    alignItems: "center",
  },
});
export default ManageGoalScreen;
