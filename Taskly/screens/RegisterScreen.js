import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import { GlobalColors } from "../GlobalColors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { register } from "../store/user-actions";
import DefaultPic from "../assets/user_icon.png";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    pictureUrl: "",
    color: "blue",
    // Image.resolveAssetSource(DefaultPic).uri,
  });

  const [fullNameError, setFullNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordMatch, setPasswordMatch] = useState("");
  const [isMatching, setIsMatching] = useState(true);

  const errorList = useSelector((state) => state.auth.errorList);

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
        } else if (errorMsg.includes("Password")) {
          setPasswordError(errorMsg);
        } else if (inputs.username?.trim() === "") {
          setUsernameError("Username is required");
        }
      }
      // dispatch(userActions.clearError());
    }
  }, [user, errorList, inputs.username, inputs]);

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    dispatch(userActions.clearError());
    setFullNameError("");
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
    setPasswordMatch("");
    setIsMatching(true);

    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: enteredValue,
      };
    });
  };
  const handleSubmit = () => {
    if (inputs?.password !== passwordMatch || passwordMatch === "") {
      setIsMatching(false);
    } else {
      setIsMatching(true);
    }

    dispatch(
      register(
        inputs.fullName,
        inputs.username,
        inputs.password,
        inputs.email,
        inputs.color,
        inputs.pictureUrl
      )
    );

    setFullNameError("");
    setUsernameError("");
    setPasswordError("");
    setEmailError("");

    dispatch(userActions.clearError());
    if (user?.username) {
      navigation.navigate("BottomNavigation");
    }
  };

  const toLogin = () => {
    dispatch(userActions.clearError());
    setFullNameError("");
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
    setPasswordMatch("");
    setIsMatching(true);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <Card>
            <View style={styles.outerContainer}>
              <View>
                <Text style={styles.header}>Welcome to Taskly!</Text>
                <Text style={styles.belowHeader}>
                  Please register down below
                </Text>
              </View>
              <View>
                <Text style={styles.label}>Full name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ex. John Smith"
                  value={inputs.fullName}
                  onChangeText={inputChangedHandler.bind(this, "fullName")}
                />
                {fullNameError && (
                  <View style={styles.errorContainer}>
                    <Ionicons name="alert" color="red" />
                    <Text style={styles.errorText}>{fullNameError}</Text>
                  </View>
                )}
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ex. JohnSmith"
                  value={inputs.username}
                  onChangeText={inputChangedHandler.bind(this, "username")}
                />
                {usernameError && (
                  <View style={styles.errorContainer}>
                    <Ionicons name="alert" color="red" />
                    <Text style={styles.errorText}>{usernameError}</Text>
                  </View>
                )}
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ex. john@smith.com"
                  value={inputs.email}
                  onChangeText={inputChangedHandler.bind(this, "email")}
                />
                {emailError && (
                  <View style={styles.errorContainer}>
                    <Ionicons name="alert" color="red" />
                    <Text style={styles.errorText}>{emailError}</Text>
                  </View>
                )}
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="*******"
                  secureTextEntry={true}
                  value={inputs.password}
                  onChangeText={inputChangedHandler.bind(this, "password")}
                />
                {passwordError && (
                  <View style={styles.errorContainer}>
                    <Ionicons name="alert" color="red" />
                    <Text style={styles.errorText}>{passwordError}</Text>
                  </View>
                )}
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="*******"
                  secureTextEntry={true}
                  value={passwordMatch}
                  onChangeText={(enteredValue) =>
                    setPasswordMatch(enteredValue)
                  }
                />
              </View>
              {!isMatching && (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert" color="red" />
                  <Text style={styles.errorText}>Passwords do not match</Text>
                </View>
              )}

              <View style={styles.button}>
                <Button
                  onPress={handleSubmit}
                  backgroundStyle={{ marginTop: 12 }}
                >
                  REGISTER
                </Button>
              </View>
              <View style={styles.register}>
                <Text style={styles.registerText}>
                  Have an account already?
                </Text>
                <Pressable onPress={toLogin}>
                  <Text style={styles.registerLink}>Login</Text>
                </Pressable>
              </View>
            </View>
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 12,
  },
  outerContainer: {
    padding: 12,
  },

  header: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: 600,
    margin: 6,
  },
  belowHeader: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: 400,
    paddingVertical: 9,
    color: "#8e8e93",
  },
  label: {
    marginTop: 6,
    marginBottom: 6,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 18,
    marginVertical: 6,
  },
  button: {
    paddingVertical: 12,
    height: 100,
  },
  register: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    paddingHorizontal: 6,
  },
  registerLink: {
    color: GlobalColors.colors.primary700,
  },
  errorContainer: {
    flexDirection: "row",
    marginVertical: 3,
  },
  errorText: {
    color: "red",
  },
});

export default RegisterScreen;
