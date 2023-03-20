import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
// import { uiActions } from "../../store/uiSlice";
import Card from "../../components/UI/Card";
// import CompletedTasks from "./CompletedTasks";
// import MoreButton from "./MoreButton";
// import TimeClock from "../pics/time.svg";
// import { editActions } from "../../store/editSlice";
// import { fetchGoalsDataByUserId } from "../../store/goals-actions";
// import { useNavigate } from "react-router-dom";
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
  //   const user = useSelector((state) => state.auth.user);
  //   useEffect(() => {
  //     dispatch(fetchGoalsDataByUserId(user.id));
  //   }, [dispatch, user.id]);

  const goals = useSelector((store) => store.goals.goalList);

  const existingItem = goals.filter((item) => item.id === Number(id));

  //   const { id, title, description, timeline, color, completed, progress } =
  //     existingItem[0];

  //   const navigate = useNavigate();

  const [completedTasks, setCompletedTasks] = useState(false);
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
      <Card>
        <View>
          <View>
            <CircularProgress
              value={85}
              inActiveStrokeColor={"#2ecc71"}
              inActiveStrokeOpacity={0.2}
              progressValueColor={"#fff"}
              valueSuffix={"%"}
            />
          </View>
          <Text>{title}</Text>
          {/* <MoreButton
            className={classes.moreBtn}
            onClick={() => {
              navigate(`/Goals/EditModal/${id}`);
              dispatch(editActions.setTitle("Update goal"));
            }}
            goal={props}
            key={id}
          /> */}
          {description.trim() !== "" && (
            <View style={styles.description}>
              <Text>Note: </Text>
              <Text>{description}</Text>
            </View>
          )}
          {timeline && (
            <View>
              {/* <img
                className={classes.timeClock}
                src={TimeClock}
                alt="time clock"
              /> */}
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
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default GoalItem;
