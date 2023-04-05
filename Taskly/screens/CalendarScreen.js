import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";
import { fetchTasksDataByUserId } from "../store/tasks-actions";

import { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GlobalColors } from "../GlobalColors";
import TaskItem from "../components/tasks/TaskItem";
import Spinner from "react-native-loading-spinner-overlay";

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks.taskList);
  const filteredTasks = tasks.filter((item) => !item.completed);
  const user = useSelector((state) => state.auth.user);

  const [colorTheme, setColorTheme] = useState(GlobalColors.colors);

  useLayoutEffect(() => {
    var color = Object.keys(GlobalColors).map(function (s) {
      return GlobalColors[user.color];
    });

    setColorTheme(color[0]);
  }, [user]);
  useEffect(() => {
    if (!user?.username) {
      navigation.navigate("Login");
    }
  });

  const [selected, setSelected] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [items, setItems] = useState();
  const tasksForDay = tasks.filter(
    (item) =>
      item.day === selected &&
      item.user.username === user.username &&
      !item.completed
  );
  const taskChanged = useSelector((state) => state.tasks.changed);

  useLayoutEffect(() => {
    dispatch(fetchTasksDataByUserId(user.id));
  }, [dispatch, user.id]);

  let markedDay = {};

  filteredTasks.map((item) => {
    markedDay[item.day] = {
      marked: true,
    };
    markedDay[selected] = {
      selected: true,
      selectedColor: colorTheme.primary400,
    };
  });

  const renderTaskItem = (itemData) => {
    return <TaskItem {...itemData.item} />;
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* <Spinner
        visible={taskChanged}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      /> */}
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={markedDay}
      />
      {tasksForDay.length > 0 ? (
        <FlatList
          style={{ marginBottom: 12 }}
          data={tasksForDay}
          renderItem={renderTaskItem}
          keyExtractor={(item) => +item.id}
        ></FlatList>
      ) : (
        <View style={{ height: "100%" }}>
          <Text style={[styles.textStyle, { color: colorTheme.primary900 }]}>
            Wow, Look! Nothing for this day!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 40,
  },
  textStyle: {
    fontSize: 18,
    flex: 1,
    margin: 5,
    marginTop: 24,
    fontWeight: "500",
    textAlign: "center",
  },
});
export default CalendarScreen;
