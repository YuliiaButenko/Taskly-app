import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ColorPicker, {
  Panel1,
  Panel3,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
  InputWidget,
  BrightnessSlider,
} from "reanimated-color-picker";
// import Button from "../UI/Button";

const ColorPickerScreen = ({ navigation, route }) => {
  const [active, setActive] = useState(route?.params.color);
  const customSwatches = [
    "#f9c46b",
    "#e3988a",
    "#a1e3aa",
    "#dbbae3",
    "#628be3",
  ];

  const hexToRgbA = (hex) => {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1)"
      );
    }
    throw new Error("Bad Hex");
  };

  const handleSubmit = (value) => {
    if (value) {
      route?.params.onSelectColor(active);
    } else {
      route?.params.onSelectColor(null);
    }
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
      <ColorPicker
        value={route?.params.color}
        sliderThickness={30}
        thumbSize={30}
        thumbShape="circle"
        onComplete={({ rgba }) => setActive(rgba)}
        style={{ width: "75%", justifyContent: "space-evenly" }}
      >
        <Preview
          style={[styles.previewStyle, styles.shadow]}
          textStyle={{ fontSize: 16 }}
        />
        <Panel3 style={styles.shadow} />

        <BrightnessSlider style={styles.shadow} />
        <OpacitySlider style={styles.shadow} />

        <Swatches swatchStyle={styles.swatchStyle} colors={customSwatches} />
      </ColorPicker>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button title="Cancel" onPress={() => handleSubmit(false)} />
        <Button title="Save" onPress={() => handleSubmit(true)} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8e8",
    paddingBottom: 70,
    width: "100%",
    maxWidth: 500,
    margin: "auto",
  },
  previewStyle: {
    height: 50,
    borderRadius: 10,
  },
  swatchStyle: {
    borderRadius: 8,
    height: 30,
    width: 40,
    margin: 0,
    marginHorizontal: 0,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default ColorPickerScreen;
