import { configureStore } from "@reduxjs/toolkit";
import goalsSlice from "./goalsSlice";
import userSlice from "./userSlice";
import tasksSlice from "./tasksSlice";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    goals: goalsSlice.reducer,
    tasks: tasksSlice.reducer,
    auth: userSlice.reducer,
  },

  middleware:
    ((getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ["your/action/type"],
          // Ignore these field paths in all actions
          ignoredActionPaths: ["meta.arg", "payload.time"],
          // Ignore these paths in the state
          ignoredPaths: ["tasks.taskList.time"],
        },
      }),
    [thunk]),
});

export default store;
