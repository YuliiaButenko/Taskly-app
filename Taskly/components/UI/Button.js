import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { GlobalColors } from "../../GlobalColors";
import { useSelector } from "react-redux";

function Button({
  children,
  onPress,
  mode,
  style,
  backgroundStyle,
  textStyle,
}) {
  const user = useSelector((state) => state.auth.user);

  const [colorTheme, setColorTheme] = useState(GlobalColors.colors);
  useEffect(() => {
    if (user?.username) {
      var color = Object.keys(GlobalColors).map(function (s) {
        return GlobalColors[user.color];
      });

      setColorTheme(color[0]);
    }
  }, []);

  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.button,
            { backgroundColor: colorTheme.primary700 },
            mode === "flat" && styles.flat,
            backgroundStyle,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && [
                styles.flatText,
                { color: colorTheme.primary50 },
              ],
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
    // backgroundColor: GlobalColors.colors.primary700,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    // color: GlobalColors.colors.primary50,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalColors.colors.primary400,
    borderRadius: 4,
  },
});
