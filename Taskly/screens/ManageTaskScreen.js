import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { tasksActions } from "../store/tasksSlice";
import { GlobalColors } from "../GlobalColors";
import TaskForm from "../components/tasks/TaskForm";
import IconButton from "../components/UI/IconButton";

const ManageTaskScreen = ({ route, navigation }) => {
  const tasks = useSelector((store) => store.tasks.taskList);
  const editedTaskId = route.params?.id;
  const selectedTask = tasks.find((task) => task.id === editedTaskId);
  const isEditing = !!editedTaskId;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Task" : "Add Task",
    });
  }, [navigation, isEditing]);

  const deleteTaskHandler = () => {
    // console.log(editedTaskId);
    dispatch(tasksActions.deleteTask(editedTaskId));

    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (taskData) => {
    if (isEditing) {
      dispatch(tasksActions.changeInputs(taskData));
    } else {
      dispatch(tasksActions.addTask(taskData));
    }
    navigation.goBack();
  };

  return (
    // <View style={styles.container}>
    <ScrollView style={styles.container}>
      <TaskForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedTask}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalColors.colors.primary800}
            size={36}
            onPress={deleteTaskHandler}
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
    paddingBottom: 30,
    backgroundColor: GlobalColors.colors.primary500,
  },
  deleteContainer: {
    marginTop: 16,
    marginBottom: 36,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalColors.colors.primary200,
    alignItems: "center",
  },
});
export default ManageTaskScreen;
