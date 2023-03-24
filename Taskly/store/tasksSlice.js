import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    taskList: [
      {
        id: 1,
        title: "Lose weight",
        description: "the task",
        time: "09:00",
        day: "2023-03-22",
        duration: 30,
        completed: false,
        goal: { title: "goal1" },
      },
      {
        id: 2,
        title: "Eat healthy",
        description: "the task",
        time: "10:00",
        day: "2023-03-23",
        duration: 30,
        completed: false,
      },
      {
        id: 2,
        title: "Eat less",
        description: "the task",
        time: "18:00",
        day: "2023-03-23",
        duration: 60,
        completed: false,
      },
    ],
    changed: false,
  },
  reducers: {
    replaceTask(state, action) {
      state.taskList = action.payload.taskList;
    },
    changeStatus(state) {
      state.changed = false;
    },
    changeInputs(state, action) {
      state.changed = true;
      const newItem = action.payload;
      const existingItem = state.taskList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.title = newItem.title;
        existingItem.description = newItem.description;
        existingItem.time = newItem.time;
        existingItem.day = newItem.day;
        existingItem.completed = newItem.completed;
        existingItem.duration = newItem.duration;
        existingItem.user = newItem.user;
        existingItem.goal = newItem.goal;
      }
    },
    addTask(state, action) {
      state.changed = true;
      const newItem = action.payload;
      state.taskList.push({
        id: newItem.id,
        title: newItem.title,
        description: newItem.description,
        time: newItem.time,
        day: newItem.day,
        duration: newItem.duration,
        completed: false,
        goal: newItem.goal,

        user: newItem.user,
      });
    },
    deleteTask: (state, action) => {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.taskList.find((item) => item.id === id);
      if (existingItem) {
        state.taskList = state.taskList.filter((item) => item.id !== id);
      }
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice;
