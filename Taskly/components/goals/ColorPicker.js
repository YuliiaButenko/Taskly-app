// import ColorPicker from "react-native-wheel-color-picker";
// import NativeColorPicker from "native-color-picker";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button";
import Color from "./Color";
import { useNavigation } from "@react-navigation/native";
import { GlobalColors } from "../../GlobalColors";

const ColorPickerInput = ({ onChange, color, custom }) => {
  const navigation = useNavigation();
  let color1;
  let color2;

  let color3;

  let color4;

  let color5;
  let color6;

  if (custom) {
    color1 = "#E4BA7A";
    color2 = "#FF8D7B";

    color3 = "#8D9A7E";

    color4 = "#ad7575";

    color5 = "#ada7c9";
    color6 = "#747BA5";
  } else {
    //teal
    color1 = GlobalColors.user.orange;
    color2 = GlobalColors.user.red;

    color3 = GlobalColors.user.pink;

    color4 = GlobalColors.user.purple;

    color5 = GlobalColors.user.teal;
    color6 = GlobalColors.user.blue;
  }
  const [active, setActive] = useState(color);
  const handleBtn1 = () => {
    setActive(color1);
    onChange(color1);
  };
  const handleBtn2 = () => {
    setActive(color2);
    onChange(color2);
  };
  const handleBtn3 = () => {
    setActive(color3);
    onChange(color3);
  };
  const handleBtn4 = () => {
    setActive(color4);
    onChange(color4);
  };
  const handleBtn5 = () => {
    setActive(color5);
    onChange(color5);
  };
  const handleBtn6 = () => {
    setActive(color6);
    onChange(color6);
  };

  const onSelectColor = (value) => {
    if (value) {
      setActive(value);
      onChange(value);
    }
  };

  const openColorPicker = () => {
    navigation.navigate("ColorPickerScreen", {
      color: active,
      onSelectColor: onSelectColor,
    });
  };

  return (
    <View style={styles.sectionContainer}>
      <Button
        style={styles.button}
        backgroundStyle={[
          active === color1 ? styles.activeBtn : null,
          {
            backgroundColor: color1,
          },
          styles.button,
        ]}
        onPress={handleBtn1}
      ></Button>
      <Button
        style={styles.button}
        backgroundStyle={[
          active === color2 ? styles.activeBtn : null,
          {
            backgroundColor: color2,
          },
          styles.button,
        ]}
        onPress={handleBtn2}
      ></Button>
      <Button
        style={styles.button}
        backgroundStyle={[
          active === color3 ? styles.activeBtn : null,
          {
            backgroundColor: color3,
          },
          styles.button,
        ]}
        onPress={handleBtn3}
      ></Button>
      <Button
        style={styles.button}
        backgroundStyle={[
          active === color4 ? styles.activeBtn : null,
          {
            backgroundColor: color4,
          },
          styles.button,
        ]}
        onPress={handleBtn4}
      ></Button>
      <Button
        backgroundStyle={[
          active === color5 ? styles.activeBtn : null,
          {
            backgroundColor: color5,
          },
          styles.button,
        ]}
        onPress={handleBtn5}
      ></Button>
      <Button
        backgroundStyle={[
          active === color6 ? styles.activeBtn : null,
          {
            backgroundColor: color6,
          },
          styles.button,
        ]}
        onPress={handleBtn6}
      ></Button>

      {custom && (
        <Pressable style={styles.button} onPress={openColorPicker}>
          <LinearGradient
            colors={["#b9314f", "#ff8d7b", "#FFF000", "#7776bc"]}
            style={[
              [color1, color2, color3, color4, color5, color6].indexOf(active) <
              0
                ? styles.activeBtn
                : null,
              styles.button,
            ]}
            start={{ y: 0.0, x: 0.0 }}
            end={{ y: 0.0, x: 1.0 }}
          >
            {/* <Animated.View style={styles.button}>
          <Color color={active} onSelectColor={onSelectColor} />
        </Animated.View> */}
          </LinearGradient>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    margin: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    // margin: 1,
    // padding: 2,
    borderRadius: 18,
    height: 36,
    width: 36,
  },
  activeBtn: {
    borderColor: "black",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 40,
    // width: "100%",
    // height: "100%",
    // maxWidth: 500,
    // margin: "auto",
  },
});

export default ColorPickerInput;
