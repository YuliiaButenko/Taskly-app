import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function initialState() {
  try {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    console.log(user);
    if (user) {
      return user;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
}

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialState(),
    errorList: [],
  },
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
    },

    logoutUser(state) {
      state.user = null;
      AsyncStorage.removeItem("user");
    },

    logError(state, action) {
      let error = action.payload;

      state.errorList.push(error);
      // console.log(state.errorList);
    },

    clearError(state) {
      state.errorList = [];
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
