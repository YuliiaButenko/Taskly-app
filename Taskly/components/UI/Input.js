import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState, useLayoutEffect } from "react";

import { GlobalColors } from "../../GlobalColors";
import { addOpacity } from "../util/addOpacity";
import { useSelector } from "react-redux";

function Input({ label, invalid, style, textInputConfig, backgroundStyle }) {
  const user = useSelector((state) => state.auth.user);

  const [colorTheme, setColorTheme] = useState(GlobalColors.colors);
  useLayoutEffect(() => {
    var color = Object.keys(GlobalColors).map(function (s) {
      return GlobalColors[user.color];
    });

    setColorTheme(color[0]);
  }, [user]);

  const inputStyles = [
    styles.input,
    { backgroundColor: colorTheme.primary200, color: colorTheme.primary700 },
  ];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text
        style={[
          styles.label,
          { color: colorTheme.primary50 },
          invalid && styles.invalidLabel,
        ]}
      >
        {label}
      </Text>
      <TextInput style={[inputStyles, backgroundStyle]} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    // color: GlobalColors.colors.primary50,
    marginBottom: 4,
  },
  input: {
    // backgroundColor: GlobalColors.colors.primary200,
    // color: GlobalColors.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalColors.colors.red500,
  },
  invalidInput: {
    backgroundColor: GlobalColors.colors.red100,
  },
});
