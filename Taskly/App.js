import { StatusBar } from "expo-status-bar";
import { AppRegistry, Platform } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalsScreen from "./screens/GoalsScreen";
import TasksScreen from "./screens/TasksScreen";
import StatsScreen from "./screens/StatsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CalendarScreen from "./screens/CalendarScreen";
import ManageGoalScreen from "./screens/ManageGoalScreen";
import ManageTaskScreen from "./screens/ManageTaskScreen";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "./store/index";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// AppRegistry.registerComponent("X", () => App);
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: "black" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={GoalsScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarLabel: "Stats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
        // screenOptions={{
        //   // headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        //   headerTintColor: "white",
        // }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={BottomNavigation}
            options={{ headerShown: false }}
          />
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
