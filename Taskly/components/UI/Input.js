import { StyleSheet, Text, TextInput, View } from "react-native";

import { GlobalColors } from "../../GlobalColors";

function Input({ label, invalid, style, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
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
    color: GlobalColors.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalColors.colors.primary100,
    color: GlobalColors.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalColors.colors.error500,
  },
  invalidInput: {
    // backgroundColor: GlobalColors.colors.error50,
  },
});
