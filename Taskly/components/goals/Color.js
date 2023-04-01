import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
  InputWidget,
} from "reanimated-color-picker";
// import Button from "../UI/Button";

export default function Color({ open, onSelectColor, color }) {
  const [active, setActive] = useState(color);
  const [showModal, setShowModal] = useState(open);

  const handleSubmit = (value) => {
    if (value) {
      onSelectColor(active);
    } else {
      onSelectColor(null);
    }
    setShowModal(false);
  };

  return (
    <>
      {/* <Button title=" " onPress={() => setShowModal(true)} /> */}

      {/* <Modal
        onRequestClose={() => setShowModal(false)}
        visible={showModal}
        animationType="slide"
      > */}
      <Modal
        onRequestClose={() => setShowModal(false)}
        visible={showModal}
        animationType="slide"
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ flex: 1 }}
        >
          <ColorPicker
            value={active}
            sliderThickness={25}
            thumbSize={30}
            style={{ width: "75%", justifyContent: "space-around" }}
            onComplete={({ hex }) => setActive(hex)}
          >
            <View style={{ justifyContent: "center", gap: 30 }}>
              <Panel1 style={styles.shadow} />

              <View style={styles.hueOpacityPreviewContainer}>
                <Preview
                  style={[styles.previewStyle, styles.shadow]}
                  hideInitialColor
                  hideText
                />

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <HueSlider
                    thumbShape="triangleDown"
                    style={[{ marginBottom: 20 }, styles.shadow]}
                    thumbColor="#00121a"
                  />
                  <OpacitySlider
                    thumbShape="triangleUp"
                    style={styles.shadow}
                    thumbColor="#00121a"
                  />
                </View>
              </View>
            </View>
          </ColorPicker>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button title="Cancel" onPress={() => handleSubmit(false)} />
            <Button title="Save" onPress={() => handleSubmit(true)} />
          </View>
        </ScrollView>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8e8",
    paddingBottom: 70,
    width: "100%",
    maxWidth: 500,
    margin: "auto",
  },
  hueOpacityPreviewContainer: {
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  previewStyle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginEnd: 20,
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
