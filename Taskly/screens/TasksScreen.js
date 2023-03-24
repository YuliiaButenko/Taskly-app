import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../GlobalColors";
import { useSelector } from "react-redux";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import TaskItem from "../components/tasks/TaskItem";
import { useEffect, useState } from "react";
import Card from "../components/UI/Card";
import { format } from "date-fns";

const TasksScreen = ({ navigation }) => {
  const tasks = useSelector((store) => store.tasks.taskList);

  const [items, setItems] = useState();

  useEffect(() => {
    let newItems = new Map();

    tasks
      .filter((item) => !item.completed)
      .map((item) => {
        if (!newItems.has(item.day)) {
          newItems.set(item.day, [item]);
        } else {
          newItems.get(item.day).push(item);
        }
      });
    setItems(Object.fromEntries(newItems));
    // console.log(items);
  }, [tasks]);

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        // if (!items[strTime]) {
        //   items[strTime] = [];

        //   const numItems = Math.floor(Math.random() * 3 + 1);
        //   for (let j = 0; j < numItems; j++) {
        //     items[strTime].push({
        //       name: "Item for " + strTime + " #" + j,
        //       height: Math.max(10, Math.floor(Math.random() * 150)),
        //       day: strTime,
        //     });
        //   }
        // }
      }
      // let newItems = new Map();

      // tasks.map((item) => {
      //   if (!newItems.has(item.day)) {
      //     newItems.set(item.day, [item]);
      //   } else {
      //     newItems.get(item.day).push(item);
      //   }
      // });
      // setItems(Object.fromEntries(newItems));
      // const newItems = {};
      // Object.keys(items).forEach((key) => {
      //   newItems[key] = items[key];
      // });
      // setItems(newItems);
    }, 1000);
  };

  const renderItem = (i) => {
    const item = tasks.find((it) => it.id === i.id);
    // console.log(item);
    let endTime;
    let startTime;
    if (!item) {
      endTime = null;
      startTime = null;
    } else {
      const formatDate = new Date(item?.day + "T" + item?.time);
      const formatEndTime = new Date(item?.day + "T" + item?.time);

      const formatedDay = format(formatDate, "MMM d, yyyy");

      if (item.duration === 0 || !item.duration) {
        endTime = null;
      } else {
        new Date(
          formatEndTime.setMinutes(
            formatEndTime.getMinutes() + Number(item.duration)
          )
        );
        endTime =
          " - " +
          new Date(formatEndTime).toLocaleString().split(",")[1].slice(0, 5) +
          new Date(formatEndTime).toLocaleString().split(",")[1].slice(8, 12);
      }
      const theTime =
        new Date(formatDate).toLocaleString().split(",")[1].slice(0, 5) +
        new Date(formatDate).toLocaleString().split(",")[1].slice(8, 12);

      if (item.time === "00:00") {
        startTime = null;
      } else {
        startTime = theTime;
      }
    }
    const handleEdit = () => {
      navigation.navigate("ManageTaskScreen", {
        id: item.id,
      });
    };

    return (
      <TouchableOpacity style={styles.item} onPress={handleEdit}>
        <View style={{ height: "100%" }}>
          {item?.goal && item.goal.completed !== true && (
            <View
              style={styles.bubbleContainer}
              // className={classes.bubble}
              // style={{ backgroundColor: goal.color }}
            >
              <Text
                style={[
                  styles.bubble,
                  { backgroundColor: item?.goal.color, opacity: 0.7 },
                ]}
              >
                {item?.goal.title}
              </Text>
            </View>
          )}
          <Text style={styles.itemTitle}>{item?.title}</Text>

          {item?.description.trim() !== "" && (
            <Text style={styles.itemDetails}>Note: {item?.description}</Text>
          )}
          {item?.day && startTime && (
            <Text style={styles.itemTime}>{[startTime, endTime]}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={{ height: "100%" }}>
        <Text style={styles.textStyle}>Wow, Look! Nothing for this day!</Text>
      </View>
    );
  };
  // const renderDay = (item) => {
  //   return (

  //     <TouchableOpacity style={[styles.item]}>
  //       <View style={{ height: "100%" }}>
  //         <Text style={styles.textStyle}>{item.name}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  const handleAdd = () => {
    navigation.navigate("ManageTaskScreen");
  };

  return (
    <View style={styles.root}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date().toISOString().slice(0, 10)}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        pastScrollRange={12}
        futureScrollRange={12}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        renderEmptyData={renderEmptyDate}
      />
      <View style={styles.addButton}>
        <Pressable onPress={handleAdd}>
          <Ionicons
            name="add-circle-outline"
            size={60}
            color={GlobalColors.colors.primary800}
          ></Ionicons>
        </Pressable>
      </View>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  bubbleContainer: {
    // backgroundColor: GlobalColors.colors.primary100,
  },
  bubble: {
    width: "30%",
    padding: 5,
    // backgroundColor: item.,
    textAlign: "center",
    overflow: "hidden",
    borderRadius: 12,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  dateViewStyle: {
    flexDirection: "row",
    justifyContent: "center",
    height: "auto",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitle: {
    color: "#283747",
    fontWeight: "500",
    fontSize: 18,
    padding: 5,
    margin: 5,
  },
  itemDetails: {
    color: "#283747",
    fontSize: 16,
    paddingLeft: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  itemTime: {
    color: "#283747",
    fontSize: 14,
    paddingLeft: 3,
    marginBottom: 5,
    marginLeft: 3,
  },
  viewStyle: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    marginTop: 30,
    height: 50,
  },
  textStyle: {
    fontSize: 18,
    flex: 1,
    margin: 5,
    marginTop: 24,
    color: "#283747",
    // fontSize: sizes.font,
    fontWeight: "500",
    color: "#283747",
    textAlign: "center",
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    // left: 0,
  },
});

export default TasksScreen;
