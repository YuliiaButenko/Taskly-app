import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import { GlobalColors } from "../GlobalColors";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../store/user-actions";
import { useState, useEffect, useLayoutEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
import { userActions } from "../store/userSlice";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import * as ImagePicker from "expo-image-picker";

const ManageUserInfoScreen = ({ route, navigation }) => {
  const user = useSelector((store) => store.auth.user);
  const colorTheme = route.params?.colorTheme;
  const dispatch = useDispatch();

  const errorList = useSelector((state) => state.auth.errorList);

  const [inputs, setInputs] = useState({
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    color: user.color ? user.color : "blue",
    pictureUrl: user.pictureUrl,
  });
  const [picture, setPicture] = useState(user.pictureUrl);

  const [fullNameError, setFullNameError] = useState();
  const [usernameError, setUsernameError] = useState();
  const [emailError, setEmailError] = useState();

  useEffect(() => {
    if (errorList) {
      for (let i = 0; i < errorList.length; i++) {
        let errorMsg = errorList[i];
        if (errorMsg.includes("real")) {
          setFullNameError(errorMsg);
        } else if (
          errorMsg.includes("username") ||
          errorMsg.includes("Username")
        ) {
          setUsernameError(errorMsg);
        } else if (errorMsg.includes("email")) {
          setEmailError(errorMsg);
        } else if (inputs.username?.trim() === "") {
          setUsernameError("Username is required");
        }
      }
    }
  }, [
    user,
    errorList,
    inputs.username,
    fullNameError,
    emailError,
    usernameError,
  ]);

  const handleSubmit = async () => {
    const userData = {
      id: inputs.id,
      fullName: inputs.fullName,
      username: inputs.username,
      email: inputs.email,
      pictureUrl: picture,
    };
    dispatch(updateUserInfo(userData));

    if (!usernameError && !fullNameError && !emailError) {
      navigation.goBack();
    } else {
      dispatch(userActions.clearError());

      setUsernameError();
      setFullNameError();
      setEmailError();
    }
  };

  const goBack = () => {
    console.log(usernameError);
    if (!usernameError && !fullNameError && !emailError) {
      console.log("go back");
    } else {
      dispatch(userActions.clearError());

      setUsernameError();
      setFullNameError();
      setEmailError();
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  };

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    if (inputs.username.length < 5) {
      setUsernameError("Username should be at least 5 characters long");
    }
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colorTheme.primary500 }]}
    >
      <KeyboardAvoidingView style={styles.form}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              picture ? { uri: picture } : require("../assets/user_icon.png")
            }
          />
          <TouchableOpacity
            style={styles.changeAvatarButton}
            onPress={pickImage}
          >
            <Text
              style={[
                styles.changeAvatarButtonText,
                { color: colorTheme.primary50 },
              ]}
            >
              Change Avatar
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputsRow}>
          <Input
            label="Full Name"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, "fullName"),
              value: inputs.fullName,
            }}
          />
          <Text
            style={{
              color: colorTheme.primary50,
              textAlign: "center",
              fontSize: 12,
            }}
          >
            We’re big on real names around here.
          </Text>
          {fullNameError && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert" color={GlobalColors.colors.red500} />
              <Text style={styles.errorText}>{fullNameError}</Text>
            </View>
          )}
          <Input
            label="Username"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, "username"),
              value: inputs.username,
            }}
          />
          {usernameError && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert" color={GlobalColors.colors.red500} />
              <Text style={styles.errorText}>{usernameError}</Text>
            </View>
          )}
          <Input
            label="Email"
            textInputConfig={{
              keyboardType: "email-address",
              onChangeText: inputChangedHandler.bind(this, "email"),
              value: inputs.email,
            }}
          />
          {emailError && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert" color={GlobalColors.colors.red500} />
              <Text style={styles.errorText}>{emailError}</Text>
            </View>
          )}
        </View>

        <View style={styles.buttons}>
          <Button
            style={styles.button}
            mode="flat"
            onPress={() => navigation.goBack()}
          >
            Cancel
          </Button>
          <Button style={styles.button} onPress={handleSubmit}>
            Update
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
  form: {
    marginTop: 40,
    flex: 1,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 5,
  },
  changeAvatarButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flex: 1,
    margin: 12,
  },

  errorText: {
    textAlign: "center",
    color: GlobalColors.colors.red500,
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

  errorContainer: {
    flexDirection: "row",
    marginVertical: 3,
  },
  errorText: {
    color: GlobalColors.colors.red500,
  },
});

export default ManageUserInfoScreen;
