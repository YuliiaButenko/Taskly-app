import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import ModalDropdown from "react-native-modal-dropdown";
import SelectDropdown from "react-native-select-dropdown";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
// } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { userActions } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { GlobalColors } from "../GlobalColors";
import ToggleSwitch from "toggle-switch-react-native";
import { updateUserInfo } from "../store/user-actions";
import { useState, useEffect, useLayoutEffect } from "react";
import Color from "../components/goals/Color";
import ColorPickerInput from "../components/goals/ColorPicker";
import Button from "../components/UI/Button";
// import { CustomColors } from "../components/util/Global";
import { customColors } from "../components/util/Global";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user);

  const [notificationsOn, setNotificationsOn] = useState(false);
  const [colorPicker, setColorPicker] = useState(false);

  const [active, setActive] = useState("blue");

  const [colorTheme, setColorTheme] = useState(GlobalColors.colors);
  useLayoutEffect(() => {
    if (user) {
      var color = Object.keys(GlobalColors).map(function (s) {
        return GlobalColors[user.color];
      });

      setColorTheme(color[0]);
    }
  }, [user, dispatch]);

  // useLayoutEffect(() => {
  //   if (user.color === GlobalColors.user.teal) {
  //     colorTheme = GlobalColors.teal;
  //   } else {
  //     colorTheme = GlobalColors.colors;
  //   }
  // }, [user, dispatch]);

  const handleClick = (user) => {
    navigation.navigate(
      "ManageUserInfoScreen"
      // {
      //   id: user.id,
      // }
    );
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);
  console.log(fadeAnim);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    setVisible(false);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const onSelectColor = (value) => {
    if (value === GlobalColors.user.teal) {
      setActive("teal");
    } else if (value === GlobalColors.user.red) {
      setActive("red");
    } else if (value === GlobalColors.user.orange) {
      setActive("orange");
    } else if (value === GlobalColors.user.purple) {
      setActive("purple");
    } else if (value === GlobalColors.user.pink) {
      setActive("pink");
    } else if (value === GlobalColors.user.gray) {
      setActive("gray");
    } else if (value === GlobalColors.user.coral) {
      setActive("coral");
    } else {
      setActive("blue");
    }
    // if (value) {
    //   setActive(value);

    // onChange(value);
    // dispatch(updateUserInfo({ ...user, color: active }));
    //   fadeOut();

    // }
  };

  const onSubmit = () => {
    dispatch(updateUserInfo({ ...user, color: active }));
    fadeOut();
  };

  const openColorPicker = () => {
    navigation.navigate("ColorPickerScreen", {
      color: active,
      onSelectColor: onSelectColor,
    });
  };

  return (
    // !colorPicker ? (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.header}>Account</Text>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => handleClick(user)}
        >
          <View style={styles.userContainer}>
            <Image
              style={styles.avatar}
              source={
                user?.pictureUrl
                  ? { uri: user.pictureUrl }
                  : require("../assets/user_icon.png")
              }
            />
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>{user.fullName}</Text>
              <Text style={styles.personalInfo}>Personal Info</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Settings</Text>

        <View style={styles.innerContainer}>
          <View
            style={[
              styles.notificationIcon,
              { backgroundColor: colorTheme.primary100 },
            ]}
          >
            <Ionicons
              name="notifications"
              size={26}
              // color={GlobalColors.colors.primary700}
              color={colorTheme.primary700}
            />
          </View>
          <Text style={styles.notificationText}>Notifications</Text>
          {/* <View> */}
          <ToggleSwitch
            // style={styles.switch}
            isOn={notificationsOn}
            // onColor={GlobalColors.colors.primary700}
            // offColor={GlobalColors.colors.primary200}
            onColor={colorTheme.primary700}
            offColor={colorTheme.primary100}
            label={notificationsOn ? "On" : "Off"}
            labelStyle={{ color: "#8e8e93", fontSize: 18 }}
            size="large"
            onToggle={() => setNotificationsOn(!notificationsOn)}
          />
          {/* </View> */}
        </View>
        <View style={styles.innerContainer}>
          <View
            style={[
              styles.notificationIcon,
              { backgroundColor: colorTheme.primary100 },
            ]}
          >
            <Ionicons
              name="color-palette"
              size={26}
              // color={GlobalColors.colors.primary700}
              color={colorTheme.primary700}
            />
          </View>
          <Text style={styles.notificationText}>Color Theme</Text>
          <Text style={styles.emptyText}></Text>

          {/* <View style={styles.forwardButton}> */}
          <Pressable
            onPress={!visible ? fadeIn : fadeOut}
            style={[
              styles.forwardButton,
              { backgroundColor: colorTheme.primary100 },
            ]}
          >
            <Ionicons
              name="chevron-forward"
              size={29}
              // color={GlobalColors.colors.primary700}
              color={colorTheme.primary700}
            />
          </Pressable>
          {/* </View> */}
        </View>
      </View>

      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
            backgroundColor: colorTheme.primary100,
          },
        ]}
      >
        <ColorPickerInput
          color={"pink"}
          // onChange={(color) => setActive(color)}
          onChange={onSelectColor}
          custom={false}
        />
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        > */}
        {/* <Button style={{ marginVertical: 7 }}>Cancel</Button> */}
        <Button onPress={onSubmit} style={{ marginVertical: 7 }}>
          Submit
        </Button>
        {/* </View> */}
      </Animated.View>

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={() => {
              dispatch(userActions.logoutUser());
              navigation.navigate("Login");
            }}
          >
            <Ionicons
              name="log-out-outline"
              size={36}
              // color={GlobalColors.colors.primary700}
              color={colorTheme.primary700}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    // ) : (
    //   <Animated.View>
    //     <Color color={active} onSelectColor={onSelectColor} />
    //   </Animated.View>
  );
};
const styles = StyleSheet.create({
  root: {
    // width: "90%",
    flex: 1,
    marginTop: 70,
    marginBottom: 12,
    // marginHorizontal: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  container: {
    marginHorizontal: "5%",
    marginVertical: "5%",
  },
  header: {
    fontSize: 28,
    fontWeight: 600,
  },
  innerContainer: {
    width: "90%",
    margin: "5%",
    // paddingHorizontal: "3%",
    // padding: "4%",
    // paddingRight: "8%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userNameContainer: {
    // marginLeft: "10%",
    paddingHorizontal: "10%",
  },
  userName: {
    fontSize: 20,
    paddingBottom: 6,
  },
  personalInfo: {
    fontSize: 18,
    color: "grey",
  },
  notificationIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    // backgroundColor: GlobalColors.colors.primary100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    // flex: 1,
    fontSize: 20,
    marginHorizontal: "10%",
  },
  emptyText: {
    marginHorizontal: "7%",
  },
  forwardButton: {
    height: 50,
    width: 60,
    borderRadius: 12,
    // backgroundColor: GlobalColors.colors.primary50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  fadingContainer: {
    // flex: 1,
    height: 100,
    marginHorizontal: 24,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // backgroundColor: GlobalColors.colors.primary100,
    borderRadius: 12,
  },
});
export default SettingsScreen;
