import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { GlobalColors } from "../../GlobalColors";

const GreetUser = ({ colorTheme }) => {
  const user = useSelector((store) => store.auth.user);
  return (
    <View style={styles.root}>
      <View style={styles.greetingContainer}>
        <Image
          style={styles.avatar}
          source={
            user?.pictureUrl
              ? { uri: user.pictureUrl }
              : require("../../assets/user_icon.png")
          }
        />
        <Text style={styles.greeting}>
          {/* Hello, {user?.fullName.split(" ")[0]} */}
          Hello, {user?.fullName}
        </Text>
      </View>

      <View>
        <Ionicons
          name="notifications-outline"
          size={28}
          color={colorTheme.primary800}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 40,
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
  },
  greeting: {
    marginLeft: 9,
    color: GlobalColors.colors.gray900,
  },
});

export default GreetUser;
