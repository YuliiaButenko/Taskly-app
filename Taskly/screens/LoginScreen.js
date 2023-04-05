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
import Input from "../components/UI/Input";
import { GlobalColors } from "../GlobalColors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { login } from "../store/user-actions";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [colorTheme, setColorTheme] = useState(GlobalColors.colors);

  const [inputs, setInputs] = useState({
    username: "JohnSmith",
    password: "P@ssw0rd!",
  });

  const errorList = useSelector((state) => state.auth.errorList);
  let [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (errorList.length > 0) {
      setLoginError(errorList[0]);
      dispatch(userActions.clearError());
    }
  }, [errorList, user]);

  useEffect(() => {
    if (user?.username) {
      var color = Object.keys(GlobalColors).map(function (s) {
        return GlobalColors[user.color];
      });

      setColorTheme(color[0]);
    }
  }, [user]);

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    dispatch(userActions.clearError());
    setLoginError("");
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const handleSubmit = () => {
    dispatch(userActions.clearError());
    setLoginError("");
    dispatch(login(inputs.username, inputs.password));
    if (user?.username) {
      navigation.navigate("BottomNavigation");
    }
  };

  const toRegister = () => {
    dispatch(userActions.clearError());
    setLoginError("");
    navigation.navigate("Register");
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
                  Please enter your account info to log in
                </Text>
              </View>
              <View>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ex. JohnSmith"
                  value={inputs.username}
                  onChangeText={inputChangedHandler.bind(this, "username")}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="*******"
                  value={inputs.password}
                  secureTextEntry={true}
                  onChangeText={inputChangedHandler.bind(this, "password")}
                />
              </View>
              {loginError && (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert" color="red" />
                  <Text style={styles.errorText}>{loginError}</Text>
                </View>
              )}
              <View style={styles.button}>
                <Button
                  onPress={handleSubmit}
                  backgroundStyle={{
                    marginTop: 18,
                  }}
                >
                  LOGIN
                </Button>
              </View>
              <View style={styles.register}>
                <Text style={styles.registerText}>Don't have an account?</Text>
                <Pressable onPress={toRegister}>
                  <Text style={styles.registerLink}>Register</Text>
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
    marginVertical: 48,
  },
  outerContainer: {
    padding: 24,
    paddingVertical: 30,
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
    marginTop: 20,
    marginBottom: 6,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 18,
  },
  button: {
    paddingVertical: 24,
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

export default LoginScreen;
