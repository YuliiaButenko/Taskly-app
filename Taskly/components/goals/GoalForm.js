import { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ColorPicker } from "react-native-color-picker";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { GlobalColors } from "../../GlobalColors";
import ColorPickerInput from "./ColorPicker";
import { CustomColors } from "../../GlobalColors";
import { addOpacity } from "../util/addOpacity";

const GoalForm = ({ submitButtonLabel, onCancel, onSubmit, defaultValues }) => {
  const goals = useSelector((store) => store.goals.goalList);
  const user = useSelector((state) => state.auth.user);
  const color = user.color;
  const [inputs, setInputs] = useState({
    id: defaultValues ? defaultValues.id : Math.random(),
    title: defaultValues ? defaultValues.title : "",
    description: defaultValues?.description ? defaultValues.description : "",
    timeline: defaultValues?.timeline
      ? defaultValues.timeline
      : new Date(new Date().setMonth(new Date().getMonth() + 1))
          .toISOString()
          .slice(0, 10),

    completed: defaultValues ? defaultValues.completed : false,
    color: defaultValues?.color
      ? defaultValues.color
      : GlobalColors.colors.primary700,
    progress: defaultValues?.progress ? defaultValues.progress : 0,
    user: user,
  });
  const [error, setError] = useState("");

  const [colorTheme, setColorTheme] = useState(GlobalColors.colors);
  useLayoutEffect(() => {
    var color = Object.keys(GlobalColors).map(function (s) {
      return GlobalColors[user.color];
    });

    setColorTheme(color[0]);
  }, [user]);

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(inputs.timeline),
      timeZoneOffsetInMinutes: 60,
      onChange: inputChangedHandler.bind(this, "timeline"),
      mode: "date",
      is24Hour: false,
    });
  };

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    if (inputIdentifier === "timeline") {
      const theDate = new Date(enteredValue.nativeEvent.timestamp);
      setInputs((curInputs) => {
        return {
          ...curInputs,
          [inputIdentifier]: theDate.toISOString().slice(0, 10),
        };
      });
    } else if (inputIdentifier === "progress") {
      if (enteredValue === 100) {
        setInputs((curInputs) => {
          return {
            ...curInputs,
            completed: true,
            [inputIdentifier]: enteredValue,
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
    } else {
      setInputs((curInputs) => {
        return {
          ...curInputs,
          [inputIdentifier]: enteredValue,
        };
      });
    }
  };

  const submitHandler = () => {
    const validGoal = goals.filter(
      (goal) => goal.title === inputs.title && goal.id !== defaultValues?.id
    );
    if (inputs.title.trim().length === 0) {
      setError("Title is required");
      return;
    }
    if (validGoal.length !== 0) {
      setError("This goal already exists");
      return;
    }

    setError("");
    const goalData = {
      id: inputs.id,
      title: inputs.title,
      description: inputs.description,
      timeline: inputs.timeline,
      completed: inputs.completed,
      progress: inputs.progress,
      color: inputs.color,
      user: inputs.user,
    };

    onSubmit(goalData);
  };

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

          <Pressable label="open">
            <View style={styles.dateInputContainer}>
              <Text style={[styles.dateLabel, { color: colorTheme.primary50 }]}>
                Date
              </Text>
              {Platform.OS === "ios" && (
                <View style={styles.datePickersIosContainer}>
                  <View
                    style={[
                      styles.datePickersIos,
                      { backgroundColor: colorTheme.primary200 },
                    ]}
                  >
                    <DateTimePicker
                      mode="date"
                      timeZoneOffsetInMinutes={60}
                      value={new Date(inputs.timeline)}
                      onChange={inputChangedHandler.bind(this, "timeline")}
                    />
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
                {inputs.timeline}
              </Button>
            </View>
          )}
          <View style={styles.dateInputContainer}>
            <Text style={[styles.dateLabel, { color: colorTheme.primary50 }]}>
              Pick a color
            </Text>
            <ColorPickerInput
              onChange={inputChangedHandler.bind(this, "color")}
              color={inputs.color}
              custom={true}
            />
          </View>
          {defaultValues && (
            <View>
              <Text style={{ fontSize: 12, color: colorTheme.primary50 }}>
                Completion
              </Text>
              <View style={styles.sliderInput}>
                <Slider
                  style={{ width: "90%", height: "10%" }}
                  minimumValue={0}
                  maximumValue={100}
                  value={inputs.progress}
                  step={5}
                  minimumTrackTintColor={colorTheme.primary200}
                  maximumTrackTintColor={colorTheme.primary800}
                  onValueChange={
                    this.value === 100
                      ? setInputs({
                          ...inputs,
                          progress: +e.target.value,
                          completed: true,
                        })
                      : inputChangedHandler.bind(this, "progress")
                  }
                />
                <Text style={styles.sliderText}>{inputs.progress}</Text>
              </View>
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

export default GoalForm;

const styles = StyleSheet.create({
  form: {
    marginVertical: 40,
    flex: 1,
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
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sliderText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    color: GlobalColors.colors.red800,
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
  datePickersIosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datePickersIos: {
    alignContent: "center",
    // backgroundColor: GlobalColors.colors.primary200,
    padding: 12,
    borderRadius: 6,
    borderColor: "transparent",
  },
  datePickers: {
    alignContent: "center",
    // backgroundColor: GlobalColors.colors.primary200,
    padding: 6,
    borderRadius: 6,
    borderColor: "transparent",
  },
  dateLabel: {
    fontSize: 12,
    // color: GlobalColors.colors.primary50,
    marginBottom: 4,
  },
  dateInputContainer: {
    marginHorizontal: 2,
    marginVertical: 8,
  },
});
