import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { deleteGoal, sendGoalsData } from "../../store/goals-actions";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import Card from "../../components/UI/Card";
import { GlobalColors } from "../../GlobalColors";
import CircularProgress from "react-native-circular-progress-indicator";

const GoalItem = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { id, title, description, timeline, color, completed, progress, user } =
    props.item;

  const goals = useSelector((store) => store.goals.goalList);
  const theUser = useSelector((state) => state.auth.user);

  const width = Dimensions.get("window").width;

  const deleteGoalHandler = () => {
    dispatch(deleteGoal(props.item));
  };
  const reactivateGoalHandler = () => {
    dispatch(
      sendGoalsData({
        ...props.item,
        completed: false,
        progress: 95,
        user: theUser,
      })
    );
  };

  const handleEdit = () => {
    if (props.edit) {
      navigation.navigate("ManageGoalScreen", {
        id: id,
        colorTheme: props.colorTheme,
      });
    } else {
      Alert.alert(
        "Important",
        `Would you like to reactivate or delete this goal?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Reactivate",
            onPress: reactivateGoalHandler,
            style: "default",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: deleteGoalHandler,
          },
        ]
      );
    }
  };

  const date = new Date(timeline).setDate(new Date(timeline).getDate() + 1);
  return (
    <View style={styles.root}>
      <Card>
        <TouchableOpacity style={styles.outerContainer} onPress={handleEdit}>
          <View style={styles.progressBar}>
            <CircularProgress
              radius={36}
              value={progress}
              inActiveStrokeColor={color}
              inActiveStrokeOpacity={0.2}
              activeStrokeColor={color}
              progressValueColor={color}
              valueSuffix={"%"}
            />
          </View>
          <View style={styles.innerContainer}>
            <View
              style={[
                styles.headerContainer,
                { borderBottomColor: color, borderBottomWidth: 1 },
              ]}
            >
              <Text style={styles.header}>{title}</Text>
            </View>

            {description.trim() !== "" && (
              <Text style={styles.description}>Note: {description}</Text>
            )}
            {timeline && !completed && (
              <Text style={styles.timeline}>
                Due: {format(date, "MMM dd, yyyy")}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get("window").width - 60,
    height: 200,
  },
  outerContainer: {
    flex: 1,
    padding: 3,
    marginHorizontal: 3,
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.75,
  },
  progressBar: {
    marginRight: 12,
  },
  innerContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 9,
    color: GlobalColors.colors.gray900,
  },
  description: {
    marginRight: 3,
    marginBottom: 9,
    marginTop: 6,
    color: GlobalColors.colors.gray900,
  },
  timeline: {
    marginTop: 9,
    marginBottom: 3,
  },
});

export default GoalItem;
