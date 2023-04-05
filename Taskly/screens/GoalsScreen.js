import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useLayoutEffect } from "react";
import GoalItem from "../components/goals/GoalItem";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../GlobalColors";
import GreetUser from "../components/user/GreetUser";
import { fetchGoalsDataByUserId } from "../store/goals-actions";
import { fetchTasksDataByUserId } from "../store/tasks-actions";
import { goalsActions } from "../store/goalsSlice";
import Spinner from "react-native-loading-spinner-overlay";

const GoalsScreen = ({ navigation }) => {
  const goals = useSelector((store) => store.goals.goalList);
  const goalChanged = useSelector((state) => state.goals.changed);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [colorTheme, setColorTheme] = useState(GlobalColors.colors);

  useLayoutEffect(() => {
    if (!user?.username) {
      navigation.navigate("Login");
    }
    dispatch(fetchGoalsDataByUserId(user.id));
    dispatch(fetchTasksDataByUserId(user.id));
    if (user?.username) {
      var color = Object.keys(GlobalColors).map(function (s) {
        return GlobalColors[user.color];
      });

      setColorTheme(color[0]);
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!user?.username) {
      navigation.navigate("Login");
    }
  });

  const active = goals
    .filter((item) => !item.completed)
    .sort((item) => (new Date(item.timeline) < new Date() ? -1 : 1));

  const completed = goals.filter((item) => item.completed);

  const handleAdd = () => {
    navigation.navigate("ManageGoalScreen", {
      colorTheme: colorTheme,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <Spinner
        visible={goalChanged}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.greeting}>
        <GreetUser colorTheme={colorTheme} />
      </View>
      <View style={styles.onProgressContainer}>
        <Text style={styles.onProgressText}>On Progress({active.length})</Text>

        {active.length > 0 ? (
          <ScrollView horizontal={true} style={styles.carousel}>
            {active.map((item) => (
              <GoalItem
                item={item}
                edit={true}
                key={item.id}
                colorTheme={colorTheme}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.emptyText}>No Active Goals</Text>
        )}
      </View>
      <View style={styles.onProgressContainer}>
        <Text style={styles.onProgressText}>Completed({completed.length})</Text>

        {completed.length > 0 ? (
          <ScrollView horizontal={true} style={styles.carousel}>
            {completed.map((item) => (
              <GoalItem
                item={item}
                edit={false}
                key={item.id}
                colorTheme={colorTheme}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.emptyText}>No Completed Goals</Text>
        )}
      </View>
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
  spinnerTextStyle: {
    color: "#FFF",
  },
  carousel: {
    paddingHorizontal: 18,
    marginRight: 18,
  },
  root: {
    flex: 1,
    marginTop: 24,
    marginBottom: 12,
  },
  greeting: {
    marginVertical: 6,
  },
  onProgressContainer: {
    marginVertical: 9,
  },
  onProgressText: {
    marginLeft: 12,
    marginTop: 18,
    marginBottom: 9,
    fontSize: 16,
    fontWeight: 500,
    color: GlobalColors.colors.gray900,
  },
  emptyText: {
    fontSize: 16,
    margin: 5,
    marginTop: 24,
    color: GlobalColors.colors.gray900,
    fontWeight: "500",
    color: "#283747",
    textAlign: "center",
  },

  addButton: {
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
});
export default GoalsScreen;
