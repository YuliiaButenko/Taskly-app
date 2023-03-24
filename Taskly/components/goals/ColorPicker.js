import ColorPicker from "react-native-wheel-color-picker";

import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button";
const ColorPickerInput = ({ onChange, color }) => {
  const COLORS = [
    "#d73964",
    "#d23440",
    "#db643a",
    "#e88334",
    "#e2a71e",
    "#e25241",
    "#d0da59",
    "#4053ae",
    "#70b949",
    "#73564a",
    "#67ab5a",
    "#8f36aa",
    "#f6c244",
    "#52b9d0",
    "#4595ec",
    "#009688",
    "#5abeA7",
    "#59bccd",
    "#4a97e4",
    "#2d68cd",
    "#9946c7",
    "#d9639e",
    "#6d6f74",
    "#939287",
    "#868ea3",
  ];
  const color1 = "#e0b60c";
  const color2 = "#ab5b5b";

  const color3 = "#75c0c6";

  const color4 = "#a6cba8";

  const color5 = "#686dad";
  const color6 = "#9868ac";
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
  const handleColorPicker = (color) => {
    setActive(color);
    onChange(color);
  };
  return (
    //   <ColorPicker
    //     onColorSelected={(color) => alert(`Color selected: ${color}`)}
    //     style={{ flex: 1 }}
    //   />
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
      {/* <View
      >
        <ColorPicker
          color={color}
          onColorChange={(color) => handleColorPicker(color)}
          onColorChangeComplete={(color) => handleColorPicker(color)}
          //   sliderHidden={true}
          //   swatches={false}
          //   thumbSize={12}
          //   thumbStyle={{ height: 30, width: 30, borderRadius: 30 }}
          //   noSnap={true}
        //   swatchesOnly={true}
         
          row={true}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    margin: 6,
    // paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    margin: 1,
    padding: 2,
    borderRadius: 18,
    height: 36,
    width: 36,
  },
  activeBtn: {
    borderColor: "black",
    borderWidth: 1,
  },
});

export default ColorPickerInput;
