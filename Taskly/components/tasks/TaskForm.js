import { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Dropdown from "react-native-input-select";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { GlobalColors } from "../../GlobalColors";

const TaskForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
  clickedDay,
}) => {
  const tasks = useSelector((store) => store.tasks.taskList);
  const goals = useSelector((store) => store.goals.goalList);
  const user = useSelector((state) => state.auth.user);
  const goalTitles = useSelector((state) =>
    state.goals.goalList
      .filter((item) => item.completed !== true)
      .map((item) => item.title)
  );

  const [colorTheme, setColorTheme] = useState(GlobalColors.colors);
  useLayoutEffect(() => {
    if (user) {
      var color = Object.keys(GlobalColors).map(function (s) {
        return GlobalColors[user.color];
      });

      setColorTheme(color[0]);
    }
  }, [user]);

  let list = [{ label: "No goal", value: "No goal" }];

  goalTitles.map((item) => {
    return list.push({ label: item, value: item });
  });

  const [inputs, setInputs] = useState({
    id: defaultValues ? defaultValues.id : Math.random(),
    title: defaultValues ? defaultValues.title : "",
    description: defaultValues?.description ? defaultValues.description : "",
    time: defaultValues?.time ? defaultValues.time : "00:00",
    day: defaultValues?.day ? defaultValues.day : clickedDay,
    goal: defaultValues?.goal ? defaultValues.goal : null,
    duration: defaultValues?.duration ? defaultValues.duration : 0,
    completed: defaultValues ? defaultValues.completed : false,
    user: user,
  });

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(inputs.day + "T" + inputs.time),
      onChange: inputChangedHandler.bind(this, "day"),
      mode: "date",
      is24Hour: false,
    });
  };

  const showTimepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(inputs.day + "T" + inputs.time),
      onChange: inputChangedHandler.bind(this, "time"),
      mode: "time",
      is24Hour: false,
    });
  };

  const [error, setError] = useState("");

  const [active, setActive] = useState(inputs.duration);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    if (inputIdentifier === "goal") {
      let goal;
      if (enteredValue === "No goal") {
        goal = null;
      } else {
        goal = {
          ...goals.find((item) => item.title === enteredValue),
          user: user,
        };
      }

      setInputs((curInputs) => {
        return {
          ...curInputs,
          [inputIdentifier]: goal,
        };
      });
    } else if (inputIdentifier === "day") {
      const theDate = new Date(enteredValue.nativeEvent.timestamp);
      setInputs((curInputs) => {
        return {
          ...curInputs,
          [inputIdentifier]: theDate.toISOString().slice(0, 10),
        };
      });
    } else if (inputIdentifier === "time") {
      const theDate = new Date(enteredValue.nativeEvent.timestamp);

      setInputs((curInputs) => {
        return {
          ...curInputs,
          [inputIdentifier]: theDate.toTimeString().slice(0, 5),
        };
      });
    } else {
      setInputs((curInputs) => {
        return {
          ...curInputs,
          [inputIdentifier]: enteredValue,
        };
      });
    }
  }

  const submitHandler = () => {
    const validTask = tasks.filter(
      (task) => task.title === inputs.title && task.id !== defaultValues?.id
    );
    if (inputs.title.trim().length === 0) {
      setError("Title is required");
      return;
    }

    setError("");
    const taskData = {
      id: inputs.id,
      title: inputs.title,
      description: inputs.description,
      completed: inputs.completed,
      time: inputs.time,
      day: inputs.day,
      duration: active,
      goal: inputs.goal ? { ...inputs.goal, user: user } : null,
      user: inputs.user,
    };

    onSubmit(taskData);
  };

  const newDate = new Date(
    new Date(inputs.day + "T" + inputs.time).setDate(
      new Date(inputs.day + "T" + inputs.time).getDate() + 1
    )
  );

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.form}>
        <View style={styles.inputsRow}>
          <Input
            style={styles.rowInput}
            label="Title"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, "title"),
              value: inputs.title,
            }}
          />
          <Input
            style={styles.rowInput}
            label="Description"
            textInputConfig={{
              multiline: true,
              onChangeText: inputChangedHandler.bind(this, "description"),
              value: inputs.description,
            }}
          />
          <Dropdown
            dropdownStyle={{
              backgroundColor: colorTheme.primary200,
              borderColor: "transparent",
              padding: 0,
              margin: 0,
              height: "12%",
            }}
            labelStyle={{ color: colorTheme.primary50 }}
            checkboxLabelStyle={{
              color: colorTheme.primary700,
              fontWeight: "500",
              fontSize: 16,
            }}
            selectedItemStyle={{
              color: colorTheme.primary700,
              fontSize: 18,
            }}
            label="Goal"
            placeholder="Select a goal"
            options={list}
            optionLabel={"label"}
            optionValue={"value"}
            selectedValue={inputs.goal?.title}
            onValueChange={inputChangedHandler.bind(this, "goal")}
            primaryColor={colorTheme.primary700}
          />
          <Pressable style={styles.rowInput} label="open">
            <View style={styles.dateInputContainer}>
              {Platform.OS === "ios" && (
                <View style={styles.datePickersIosContainer}>
                  <View>
                    <Text
                      style={[
                        styles.dateLabel,
                        { color: colorTheme.primary50 },
                      ]}
                    >
                      Date
                    </Text>
                    <View
                      style={[
                        styles.datePickersIos,
                        { backgroundColor: colorTheme.primary200 },
                      ]}
                    >
                      <DateTimePicker
                        mode="date"
                        value={
                          inputs?.day
                            ? new Date(inputs.day + "T" + inputs.time)
                            : new Date()
                        }
                        onChange={inputChangedHandler.bind(this, "day")}
                      />
                    </View>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.dateLabel,
                        { color: colorTheme.primary50 },
                      ]}
                    >
                      Time
                    </Text>
                    <View
                      style={[
                        styles.datePickersIos,
                        { backgroundColor: colorTheme.primary200 },
                      ]}
                    >
                      <DateTimePicker
                        mode="time"
                        value={new Date(inputs.day + "T" + inputs.time)}
                        onChange={inputChangedHandler.bind(this, "time")}
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
          </Pressable>
          {Platform.OS === "android" && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={[styles.dateLabel, { color: colorTheme.primary50 }]}
                >
                  Date
                </Text>
                <Button
                  onPress={showDatepicker}
                  title="Show date picker!"
                  backgroundStyle={{
                    backgroundColor: colorTheme.primary100,
                  }}
                  textStyle={{
                    color: colorTheme.primary700,
                    fontSize: 18,
                  }}
                  style={[
                    styles.datePickers,
                    { backgroundColor: colorTheme.primary200 },
                  ]}
                >
                  {format(new Date(inputs.day), "MMM d, yyyy")}
                </Button>
              </View>
              <View>
                <Text style={styles.dateLabel}>Time</Text>
                <Button
                  onPress={showTimepicker}
                  title="Show time picker!"
                  backgroundStyle={{
                    backgroundColor: colorTheme.primary100,
                  }}
                  textStyle={{
                    color: colorTheme.primary700,
                    fontSize: 18,
                  }}
                  style={[
                    styles.datePickers,
                    { backgroundColor: colorTheme.primary200 },
                  ]}
                >
                  {new Date(inputs.day + "T" + inputs.time)
                    .toLocaleString()
                    .split(",")[1]
                    .slice(0, 5) +
                    new Date(inputs.day + "T" + inputs.time)
                      .toLocaleString()
                      .split(",")[1]
                      .slice(8, 12)}
                </Button>
              </View>
            </View>
          )}
          {inputs.time !== "00:00" && (
            <View
              style={[
                styles.durationContainer,
                { backgroundColor: colorTheme.primary200 },
              ]}
            >
              <Button
                title="15"
                onPress={() => {
                  setActive("15");
                }}
                backgroundStyle={
                  active !== "15"
                    ? styles.passiveBtn
                    : { backgroundColor: colorTheme.primary400 }
                }
                textStyle={
                  active !== "15"
                    ? {
                        color: colorTheme.primary700,
                        fontSize: 18,
                      }
                    : {
                        color: "white",
                        fontSize: 18,
                      }
                }
              >
                15m
              </Button>
              <Button
                title="30"
                onPress={() => {
                  setActive("30");
                }}
                backgroundStyle={
                  active !== "30"
                    ? styles.passiveBtn
                    : { backgroundColor: colorTheme.primary400 }
                }
                textStyle={
                  active !== "30"
                    ? {
                        color: colorTheme.primary700,
                        fontSize: 18,
                      }
                    : {
                        color: "white",
                        fontSize: 18,
                      }
                }
              >
                30m
              </Button>
              <Button
                title="45"
                onPress={() => {
                  setActive("45");
                }}
                backgroundStyle={
                  active !== "45"
                    ? styles.passiveBtn
                    : { backgroundColor: colorTheme.primary400 }
                }
                textStyle={
                  active !== "45"
                    ? {
                        color: colorTheme.primary700,
                        fontSize: 18,
                      }
                    : {
                        color: "white",
                        fontSize: 18,
                      }
                }
              >
                45m
              </Button>
              <Button
                title="60"
                onPress={() => {
                  setActive("60");
                }}
                backgroundStyle={
                  active !== "60"
                    ? styles.passiveBtn
                    : { backgroundColor: colorTheme.primary400 }
                }
                textStyle={
                  active !== "60"
                    ? {
                        color: colorTheme.primary700,
                        fontSize: 18,
                      }
                    : {
                        color: "white",
                        fontSize: 18,
                      }
                }
              >
                1hr
              </Button>
              <Button
                title="90"
                onPress={() => {
                  setActive("90");
                }}
                backgroundStyle={
                  active !== "90"
                    ? styles.passiveBtn
                    : { backgroundColor: colorTheme.primary400 }
                }
                textStyle={
                  active !== "90"
                    ? {
                        color: colorTheme.primary700,
                        fontSize: 18,
                      }
                    : {
                        color: "white",
                        fontSize: 18,
                      }
                }
              >
                1.5hr
              </Button>
              <Button
                title="120"
                onPress={() => {
                  setActive("120");
                }}
                backgroundStyle={
                  active !== "120"
                    ? styles.passiveBtn
                    : { backgroundColor: colorTheme.primary400 }
                }
                textStyle={
                  active !== "120"
                    ? {
                        color: colorTheme.primary700,
                        fontSize: 18,
                      }
                    : {
                        color: "white",
                        fontSize: 18,
                      }
                }
              >
                2hr
              </Button>
            </View>
          )}
          {defaultValues && (
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={inputs.completed}
                onValueChange={inputChangedHandler.bind(this, "completed")}
                color={
                  !!inputs.completed
                    ? colorTheme.primary800
                    : colorTheme.primary50
                }
              />
              <Text
                style={[
                  styles.dateLabel,
                  {
                    fontSize: 14,
                    marginVertical: 5,
                    color: colorTheme.primary50,
                  },
                ]}
              >
                Mark as completed
              </Text>
            </View>
          )}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.buttons}>
          <Button style={styles.button} mode="flat" onPress={onCancel}>
            Cancel
          </Button>
          <Button style={styles.button} onPress={submitHandler}>
            {submitButtonLabel}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flex: 1,
    margin: 12,
  },
  rowInput: {},

  sliderInput: {
    flex: 1,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  sliderText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  datePickersIosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datePickersIos: {
    alignContent: "center",
    // backgroundColor: GlobalColors.colors.primary200,
    padding: 12,
    borderRadius: 12,
    borderColor: "transparent",
  },
  datePickers: {
    alignContent: "center",
    // backgroundColor: GlobalColors.colors.primary200,
    padding: 6,
    borderRadius: 12,
    borderColor: "transparent",
  },

  datePickerContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    color: GlobalColors.colors.red500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },

  dateInputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  dateLabel: {
    fontSize: 12,
    // color: GlobalColors.colors.primary50,
    marginBottom: 4,
  },
  // dateInput: {
  //   // backgroundColor: GlobalColors.colors.primary200,
  //   // color: GlobalColors.colors.primary700,
  //   padding: 6,
  //   borderRadius: 6,
  //   fontSize: 18,
  // },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 9,
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: GlobalColors.colors.primary200,
    borderColor: "transparent",
    padding: 3,
    marginVertical: 12,
    marginTop: 24,
    borderRadius: 6,
  },
  passiveBtn: {
    backgroundColor: null,
  },
});

export default TaskForm;
