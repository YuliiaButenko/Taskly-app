import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ColorPicker } from "react-native-color-picker";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../util/date";
import { GlobalColors } from "../../GlobalColors";
import ColorPickerInput from "./ColorPicker";

const GoalForm = ({ submitButtonLabel, onCancel, onSubmit, defaultValues }) => {
  const goals = useSelector((store) => store.goals.goalList);

  const [inputs, setInputs] = useState({
    id: defaultValues ? defaultValues.id : Math.random(),
    title: defaultValues ? defaultValues.title : "",
    description: defaultValues?.description ? defaultValues.description : "",
    timeline: defaultValues?.timeline
      ? defaultValues.timeline
      : // new Date(
        //     new Date(defaultValues.timeline).setDate(
        //       new Date(defaultValues.timeline).getDate()
        //     )
        //   )
        new Date(new Date().setMonth(new Date().getMonth() + 1))
          .toISOString()
          .slice(0, 10),

    completed: defaultValues ? defaultValues.completed : false,
    color: defaultValues?.color
      ? defaultValues.color
      : GlobalColors.colors.primary700,
    progress: defaultValues?.progress ? defaultValues.progress : 0,
    // user: defaultValues ? defaultValues.progress : null,
  });
  // console.log(inputs.timeline);
  const [formHasChanged, setFormHasChanged] = useState(false);
  const [error, setError] = useState("");
  let formIsValid = true;
  if (inputs.title.trim() === "") {
    formIsValid = false;
  } else {
    formIsValid = true;
  }
  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(inputs.timeline),
      timeZoneOffsetInMinutes: 60,
      onChange: inputChangedHandler.bind(this, "timeline"),
      mode: "date",
      is24Hour: false,
    });
  };

  function inputChangedHandler(inputIdentifier, enteredValue) {
    if (inputIdentifier === "timeline") {
      const theDate = new Date(enteredValue.nativeEvent.timestamp);
      setInputs((curInputs) => {
        setFormHasChanged(true);
        return {
          ...curInputs,
          [inputIdentifier]: theDate.toISOString().slice(0, 10),
        };
      });
    } else if (inputIdentifier === "progress") {
      if (enteredValue === 100) {
        setInputs((curInputs) => {
          setFormHasChanged(true);
          return {
            ...curInputs,
            completed: true,
            [inputIdentifier]: enteredValue,
          };
        });
      } else {
        setInputs((curInputs) => {
          setFormHasChanged(true);
          return {
            ...curInputs,
            [inputIdentifier]: enteredValue,
          };
        });
      }
    } else {
      setInputs((curInputs) => {
        setFormHasChanged(true);
        return {
          ...curInputs,
          [inputIdentifier]: enteredValue,
        };
      });
    }
  }

  function submitHandler() {
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
    setFormHasChanged(true);
    const goalData = {
      id: inputs.id,
      title: inputs.title,
      description: inputs.description,
      timeline: inputs.timeline,
      completed: inputs.completed,
      progress: inputs.progress,
      color: inputs.color,
    };

    //   dispatch(
    //     goalsActions.changeInputs({
    //       id: inputs.id,
    //       title: inputs.title,
    //       description: inputs.description,
    //       timeline: inputs.timeline,
    //       completed: inputs.completed,
    //       progress: inputs.progress,
    //     //   user: inputs.user,
    //     })
    //   );

    onSubmit(goalData);
  }

  return (
    <View style={styles.form}>
      {/* <Text style={styles.title}>Your Expense</Text> */}
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Title"
          //   invalid={inputs.title.trim().length === 0}
          textInputConfig={{
            //   keyboardType: "",
            onChangeText: inputChangedHandler.bind(this, "title"),
            value: inputs.title,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Description"
          //   invalid={inputs.title.trim().length === 0}
          textInputConfig={{
            //   keyboardType: "",
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, "description"),
            value: inputs.description,
          }}
        />
        {/* <Input
          style={styles.rowInput}
          label="Timeline"
          //   invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "timeline"),
            value: inputs.timeline,
          }}
        /> */}
        <Pressable label="open">
          <View style={styles.dateInputContainer}>
            <Text style={styles.dateLabel}>Date</Text>
            {Platform.OS === "ios" && (
              <View style={styles.datePickersIosContainer}>
                {/* <View> */}
                {/* <Text style={styles.dateLabel}>Date</Text> */}
                <View style={styles.datePickersIos}>
                  <DateTimePicker
                    mode="date"
                    timeZoneOffsetInMinutes={60}
                    value={new Date(inputs.timeline)}
                    onChange={inputChangedHandler.bind(this, "timeline")}
                  />
                  {/* </View> */}
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
                backgroundColor: GlobalColors.colors.primary100,
              }}
              textStyle={{
                color: GlobalColors.colors.primary700,
                fontSize: 18,
              }}
              style={styles.datePickers}
            >
              {inputs.timeline}
            </Button>
          </View>
        )}
        <View style={styles.dateInputContainer}>
          <Text style={styles.dateLabel}>Pick a color</Text>
          <ColorPickerInput
            onChange={inputChangedHandler.bind(this, "color")}
            color={inputs.color}
          />
        </View>
        {defaultValues && (
          <View>
            <Text
              style={{ fontSize: 12, color: GlobalColors.colors.primary100 }}
            >
              Completion
            </Text>
            <View style={styles.sliderInput}>
              <Slider
                style={{ width: "90%", height: "10%" }}
                minimumValue={0}
                maximumValue={100}
                value={inputs.progress}
                step={5}
                minimumTrackTintColor={GlobalColors.colors.primary200}
                maximumTrackTintColor={GlobalColors.colors.primary800}
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

      {error && (
        <Text style={styles.errorText}>
          {/* Invalid input values - please check your entered data! */}
          {error}
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default GoalForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    flex: 1,
    // flexDirection
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    flex: 1,
    margin: 12,
  },
  rowInput: {
    // flex: 1,
  },

  sliderInput: {
    flex: 1,
    // margin: 12,
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
    textAlign: "center",
    color: GlobalColors.colors.error500,
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
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datePickersIos: {
    // flex: 1,
    alignContent: "center",
    backgroundColor: GlobalColors.colors.primary100,
    padding: 12,
    borderRadius: 6,
    borderColor: "transparent",
  },
  datePickers: {
    // flex: 1,
    alignContent: "center",
    backgroundColor: GlobalColors.colors.primary100,
    padding: 6,
    borderRadius: 6,
    borderColor: "transparent",
  },
  dateLabel: {
    fontSize: 12,
    color: GlobalColors.colors.primary100,
    marginBottom: 4,
  },
  dateInputContainer: {
    marginHorizontal: 2,
    marginVertical: 8,
  },
});
