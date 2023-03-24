import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../GlobalColors";

function Button({
  children,
  onPress,
  mode,
  style,
  backgroundStyle,
  textStyle,
}) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.button,
            mode === "flat" && styles.flat,
            backgroundStyle,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && styles.flatText,
              textStyle,
            ]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalColors.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalColors.colors.primary50,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalColors.colors.primary100,
    borderRadius: 4,
  },
});
