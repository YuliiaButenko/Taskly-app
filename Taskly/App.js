import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalsScreen from "./screens/GoalsScreen";
import TasksScreen from "./screens/TasksScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CalendarScreen from "./screens/CalendarScreen";
import ManageGoalScreen from "./screens/ManageGoalScreen";
import ManageTaskScreen from "./screens/ManageTaskScreen";
import ManageUserInfoScreen from "./screens/ManageUserInfoScreen";
import ColorPickerScreen from "./screens/ColorPickerScreen";
import LoginScreen from "./screens/LoginScreen";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "./store/index";
import TasksEventScreen from "./screens/TasksEventScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { GlobalColors } from "./GlobalColors";
import RegisterScreen from "./screens/RegisterScreen";
import { useState, useEffect, useLayoutEffect } from "react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavigation = ({ user }) => {
  const [colorTheme, setColorTheme] = useState(GlobalColors.colors);
  useLayoutEffect(() => {
    var color = Object.keys(GlobalColors).map(function (s) {
      return GlobalColors[user?.color];
    });

    setColorTheme(color[0]);
  }, [user]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: "black" },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Hub"
        component={GoalsScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: focused
                    ? colorTheme.primary800
                    : colorTheme.primary300,
                }}
              >
                Hub
              </Text>
            );
          },

          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "aperture" : "aperture-outline"}
              size={24}
              color={focused ? colorTheme.primary800 : colorTheme.primary300}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Planner"
        component={TasksEventScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: focused
                    ? colorTheme.primary800
                    : colorTheme.primary300,
                }}
              >
                Planner
              </Text>
            );
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "briefcase" : "briefcase-outline"}
              size={24}
              color={focused ? colorTheme.primary800 : colorTheme.primary300}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: focused
                    ? colorTheme.primary800
                    : colorTheme.primary300,
                }}
              >
                Calendar
              </Text>
            );
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={24}
              color={focused ? colorTheme.primary800 : colorTheme.primary300}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: focused
                    ? colorTheme.primary800
                    : colorTheme.primary300,
                }}
              >
                Settings
              </Text>
            );
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={focused ? colorTheme.primary800 : colorTheme.primary300}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "helvetica-neue": require("./assets/fonts/Helvetica-Neue.ttf"),
  });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            store.getState().auth.user?.username ? "BottomNavigation" : "Login"
          }
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              tabBarLabel: ({ focused }) => {
                return (
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: focused
                        ? GlobalColors.colors.primary700
                        : "#8e8e93",
                    }}
                  >
                    Login
                  </Text>
                );
              },
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "log-in" : "log-in-outline"}
                  size={24}
                  color={focused ? GlobalColors.colors.primary700 : "#8e8e93"}
                />
              ),
            }}
          />
          <Stack.Screen
            name="BottomNavigation"
            options={{ headerShown: false }}
          >
            {(props) => <BottomNavigation user={store.getState().auth.user} />}
          </Stack.Screen>
          <Stack.Screen
            name="ManageGoalScreen"
            component={ManageGoalScreen}
            options={{
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="ManageTaskScreen"
            component={ManageTaskScreen}
            options={{
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="ManageUserInfoScreen"
            component={ManageUserInfoScreen}
            options={{
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="ColorPickerScreen"
            component={ColorPickerScreen}
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              tabBarLabel: ({ focused }) => {
                return (
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: focused
                        ? GlobalColors.colors.primary700
                        : "#8e8e93",
                    }}
                  >
                    Register
                  </Text>
                );
              },
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "log-in" : "log-in-outline"}
                  size={24}
                  color={focused ? GlobalColors.colors.primary700 : "#8e8e93"}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
