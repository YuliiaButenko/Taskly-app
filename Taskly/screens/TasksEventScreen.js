import EventCalendar from "react-native-events-calendar";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { GlobalColors } from "../GlobalColors";
import { Ionicons } from "@expo/vector-icons";
import { fetchTasksDataByUserId } from "../store/tasks-actions";
import Spinner from "react-native-loading-spinner-overlay";

const TasksEventScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  let { width } = Dimensions.get("window");
  const tasks = useSelector((store) => store.tasks.taskList);
  const taskChanged = useSelector((state) => state.tasks.changed);
  const user = useSelector((state) => state.auth.user);
  const [items, setItems] = useState([]);
  const [day, setDay] = useState(new Date().toISOString().slice(0, 10));
  const [colorTheme, setColorTheme] = useState(GlobalColors.colors);

  useLayoutEffect(() => {
    let values = [];
    tasks
      .filter((item) => !item.completed)
      .map((item) => {
        let i = renderItem(item);
        values.push(i);
        setItems((prev) => [...values]);
      });
    var color = Object.keys(GlobalColors).map(function (s) {
      return GlobalColors[user.color];
    });

    setColorTheme(color[0]);
  }, [tasks, user]);

  useEffect(() => {
    dispatch(fetchTasksDataByUserId(user.id));
  }, [dispatch, user.id]);

  const renderItem = (item) => {
    let formatStartTime =
      new Date(item.day).toISOString().slice(0, 10) + " " + "09:00";
    let formatEndTime = new Date(
      new Date(item.day).toISOString().slice(0, 10) + "T" + "09:00"
    );
    if (item?.time !== "00:00") {
      formatStartTime = format(
        new Date(item.day + "T" + item.time),
        "yyyy-MM-dd kk:mm"
      );
      formatEndTime = new Date(item?.day + "T" + item?.time);
    }
    if (item.duration === 0 || !item.duration) {
      new Date(
        formatEndTime.setMinutes(formatEndTime.getMinutes() + Number(60))
      );
    } else {
      new Date(
        formatEndTime.setMinutes(
          formatEndTime.getMinutes() + Number(item.duration)
        )
      );
    }
    formatEndTime = format(formatEndTime, "yyyy-MM-dd kk:mm");
    return {
      start: formatStartTime,
      end: formatEndTime,
      id: item.id,
      title: item.title,
      description: item.description,
      duration: item.duration,
      goal: item.goal,
    };
  };

  const handleClick = (item) => {
    navigation.navigate("ManageTaskScreen", {
      id: item.id,
    });
  };

  const handleAdd = () => {
    navigation.navigate("ManageTaskScreen", {
      clickedDay: day,
    });
  };

  const displayItem = (item) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => handleClick(item)}
      >
        {item.duration <= 15 && item.duration > 0 ? (
          <View style={styles.container}>
            <Text>{item.title}</Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.container}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            {item?.goal && item.goal.completed !== true && (
              <Text
                style={[styles.bubble, { backgroundColor: item?.goal.color }]}
              >
                {item.goal.title}
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* <Spinner
        visible={taskChanged}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      /> */}
      <EventCalendar
        renderEvent={(item) => displayItem(item)}
        virtualizedListProps={items}
        events={items}
        width={width}
        initDate={new Date().toDateString()}
      />
      <View style={styles.addButton}>
        <Pressable onPress={handleAdd}>
          <Ionicons
            name="add-circle-outline"
            size={60}
            color={colorTheme.primary700}
          ></Ionicons>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    overflow: "hidden",
  },
  root: {
    flex: 1,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    paddingBottom: 6,
  },
  description: { fontSize: 14 },
  bubble: {
    height: 30,
    padding: 5,
    margin: 3,
    textAlign: "center",
    overflow: "hidden",
    borderRadius: 12,
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
});

export default TasksEventScreen;
