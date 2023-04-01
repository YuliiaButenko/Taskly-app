import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { GlobalColors } from "../../GlobalColors";

const TaskItem = (item) => {
  const navigation = useNavigation();
  const handleEdit = () => {
    navigation.navigate("ManageTaskScreen", {
      id: item.id,
    });
  };
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
  return (
    // <Card>
    <TouchableOpacity style={styles.item} onPress={handleEdit}>
      <View style={{ height: "100%" }}>
        {item?.goal && item.goal.completed !== true && (
          <View>
            <Text
              style={[styles.bubble, { backgroundColor: item?.goal.color }]}
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
    width: "80%",
    alignSelf: "center",
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },

  bubble: {
    width: "30%",
    padding: 5,
    textAlign: "center",
    overflow: "hidden",
    borderRadius: 12,
    color: "white",
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
    color: GlobalColors.colors.gray900,
    fontWeight: "500",
    fontSize: 18,
    padding: 5,
    margin: 5,
  },
  itemDetails: {
    color: GlobalColors.colors.gray900,
    fontSize: 16,
    paddingLeft: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  itemTime: {
    color: GlobalColors.colors.gray900,
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
    color: GlobalColors.colors.gray900,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default TaskItem;
