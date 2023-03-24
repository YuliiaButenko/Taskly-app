import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import { uiActions } from "../../store/uiSlice";
import Card from "../../components/UI/Card";
// import CompletedTasks from "./CompletedTasks";
// import MoreButton from "./MoreButton";
// import { editActions } from "../../store/editSlice";
// import { fetchGoalsDataByUserId } from "../../store/goals-actions";
// import { format } from "date-fns";
import CircularProgress from "react-native-circular-progress-indicator";

const GoalItem = ({
  id,
  title,
  description,
  timeline,
  color,
  completed,
  progress,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //   const user = useSelector((state) => state.auth.user);
  // useEffect(() => {
  //   dispatch(fetchGoalsDataByUserId(user.id));
  // }, [dispatch, user.id]);

  const goals = useSelector((store) => store.goals.goalList);

  const existingItem = goals.filter((item) => item.id === Number(id));

  //   const { id, title, description, timeline, color, completed, progress } =
  //     existingItem[0];

  //   const navigate = useNavigate();

  const [completedTasks, setCompletedTasks] = useState(false);

  const handleEdit = () => {
    navigation.navigate("ManageGoalScreen", {
      id: id,
    });
  };
  //   const toggleGoalHandler = () => {
  //     setCompletedTasks(!completedTasks);
  //     dispatch(uiActions.toggle());
  //   };

  //   const tasks = useSelector((state) => state.tasks.taskList);

  //   const goalTasks = tasks
  //     .filter((item) => item.goal?.title === title)
  //     .sort((a, b) => {
  //       //sort for not completed and overdue tasks
  //       return new Date(b.day + "T" + b.time) < new Date() && !b.completed
  //         ? -1
  //         : 1;
  //     })
  //     .sort((a, b) => {
  //       return a.completed > !b.completed ? 1 : -1;
  //     });
  return (
    <>
      <Card style={styles.card}>
        <TouchableOpacity style={styles.root} onPress={handleEdit}>
          {/* <View style={styles.root}> */}
          <View style={styles.progressBar}>
            <CircularProgress
              radius={36}
              value={progress}
              inActiveStrokeColor={color}
              inActiveStrokeOpacity={0.2}
              activeStrokeColor={color}
              progressValueColor={"color"}
              valueSuffix={"%"}
            />
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{title}</Text>
              {/* <Pressable
                onPress={handleEdit}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Ionicons name="ellipsis-horizontal" size={24}></Ionicons>
              </Pressable> */}
            </View>

            {description.trim() !== "" && (
              <View style={styles.description}>
                <Text>Note: {description}</Text>
                {/* <Text>{description}</Text> */}
              </View>
            )}
            {timeline && (
              <View>
                {/* icon */}
                <Text>
                  {/* {format(
                  new Date(timeline).setDate(new Date(timeline).getDate() + 1),
                  "MMM dd, yyyy"
                )} */}
                  {timeline}
                </Text>
              </View>
            )}
            {/* {goalTasks.length > 0 && (
                <button
                  className={classes.itemButton}
                  onClick={toggleGoalHandler}
                  style={buttonStyle}
                >
                  View Tasks
                </button>
              )} */}
          </View>
        </TouchableOpacity>
      </Card>

      {/* {completedTasks && (
            <div>

              {goalTasks.length > 0 &&
                goalTasks.map((item) => (
                  <CompletedTasks
                    key={item.id}
                    className={classes.items}
                    item={item}
                    title={"Eat healthy"}
                    date={"01/10/2023"}
                  />
                ))}
            </div>
          )} */}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 3,
    margin: 6,
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
    maxWidth: "90%",
  },
  headerContainer: { flexDirection: "row", justifyContent: "space-between" },
  header: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 9,
  },
  description: {
    flex: 1,
    flexDirection: "row",
    marginRight: 6,
    marginBottom: 9,
  },
});

export default GoalItem;
