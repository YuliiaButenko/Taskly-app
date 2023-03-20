import { createSlice } from "@reduxjs/toolkit";

const goalsSlice = createSlice({
  name: "goals",
  initialState: {
    goalList: [
      {
        id: 1,
        title: "Lose weight",
        description: "Getting ready for the wedding",
        timeline: "2023-05-01",
        color: "blue",
        completed: false,
        progress: 20,
      },
    ],
    changed: false,
  },
  reducers: {
    replaceGoal(state, action) {
      state.goalList = action.payload.goalList;
    },
    changeStatus(state) {
      state.changed = false;
    },
    changeColor(state, action) {
      state.changed = true;
      const newItem = action.payload;
      const existingItem = state.goalList.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.color = newItem.color;
      }
    },
    changeInputs(state, action) {
      state.changed = true;
      const newItem = action.payload;
      const existingItem = state.goalList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.title = newItem.title;
        existingItem.description = newItem.description;
        existingItem.timeline = newItem.timeline;
        existingItem.completed = newItem.completed;
        existingItem.user = newItem.user;
        existingItem.progress = newItem.progress;
      }
    },
    addGoal(state, action) {
      state.changed = true;
      const newItem = action.payload;
      state.goalList.push({
        id: newItem.id,
        title: newItem.title,
        description: newItem.description,
        timeline: newItem.timeline,
        color: newItem.color,
        user: newItem.user,
        completed: false,
        progress: 0,
      });
    },
    deleteGoal: (state, action) => {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.goalList.find((user) => user.id === id);
      if (existingItem) {
        state.goals = state.goalList.filter((user) => user.id !== id);
      }
    },
  },
});

export const goalsActions = goalsSlice.actions;

export default goalsSlice;
