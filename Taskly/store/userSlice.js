import { createSlice } from "@reduxjs/toolkit";

// function initialState() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user) {
//     return user;
//   } else {
//     return {};
//   }
// }

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    errorList: [],
  },
  reducers: {
    loginUser(state, action) {
      // const user = action.payload;
      state.user = action.payload;
      // JSON.parse(localStorage.getItem("user"));

      // state.user.username = user.username;
      // state.user.email = user.email;
      // state.user.id = user.id;
      // state.user.token = user.token;
    },

    logoutUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },

    logError(state, action) {
      let error = action.payload;

      state.errorList.push(error);
    },

    clearError(state) {
      state.errorList = [];
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
