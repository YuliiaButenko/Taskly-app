import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect, useEffect, useState } from "react";
import { tasksActions } from "../store/tasksSlice";
import { GlobalColors } from "../GlobalColors";
import TaskForm from "../components/tasks/TaskForm";
import IconButton from "../components/UI/IconButton";
import {
  createTask,
  deleteTask,
  updateTask,
  fetchTasksDataByUserId,
} from "../store/tasks-actions";

const ManageTaskScreen = ({ route, navigation }) => {
  const tasks = useSelector((store) => store.tasks.taskList);
  const user = useSelector((state) => state.auth.user);
  const editedTaskId = route.params?.id;
  const selectedTask = tasks.find((task) => task.id === editedTaskId);
  const isEditing = !!editedTaskId;
  const dispatch = useDispatch();
  const clickedDay = route.params?.clickedDay;
  const taskChanged = useSelector((state) => state.tasks.changed);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Task" : "Add Task",
    });
    dispatch(fetchTasksDataByUserId(user.id));
    var color = Object.keys(GlobalColors).map(function (s) {
      return GlobalColors[user.color];
    });

    setColorTheme(color[0]);
  }, [navigation, isEditing, user]);

  useEffect(() => {
    // if (taskChanged) {
    dispatch(fetchTasksDataByUserId(user.id));
    dispatch(tasksActions.changeStatus());
    // }
  }, [dispatch, user.id]);

  const [colorTheme, setColorTheme] = useState(GlobalColors.colors);
  // useLayoutEffect(() => {
  //   var color = Object.keys(GlobalColors).map(function (s) {
  //     return GlobalColors[user.color];
  //   });

  //   setColorTheme(color[0]);
  // }, [user]);

  const deleteTaskHandler = () => {
    dispatch(tasksActions.changeStatusToActive());
    dispatch(deleteTask(selectedTask));
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (taskData) => {
    if (isEditing) {
      // console.log(taskData);
      dispatch(updateTask(taskData));
    } else {
      dispatch(createTask(taskData));
    }
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colorTheme.primary500 }]}
    >
      <KeyboardAvoidingView behavior="padding">
        <TaskForm
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
          defaultValues={selectedTask}
          clickedDay={clickedDay}
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
              onPress={deleteTaskHandler}
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
    paddingBottom: 30,
    // backgroundColor: GlobalColors.colors.primary500,
  },
  deleteContainer: {
    marginTop: 16,
    marginBottom: 36,
    paddingTop: 8,
    borderTopWidth: 2,
    // borderTopColor: GlobalColors.colors.primary700,
    alignItems: "center",
  },
});
export default ManageTaskScreen;
