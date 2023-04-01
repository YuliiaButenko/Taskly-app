import { Api } from "../components/util/Api";
import { tasksActions } from "./tasksSlice";

export const fetchTasksData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${Api}/task`, init);

      if (!response.ok) {
        throw new Error("Could not fetch task data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const taskData = await fetchData();

      dispatch(tasksActions.replaceTask({ taskList: taskData }));
    } catch (error) {
      console.log("error");
    }
  };
};

export const fetchTasksDataByUserId = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${Api}/task/user/${userId}`, init);

      if (!response.ok) {
        throw new Error("Could not fetch task data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const taskData = await fetchData();

      dispatch(tasksActions.replaceTask({ taskList: taskData }));
    } catch (error) {
      console.log("error");
    }
  };
};

export const updateTask = (task) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${Api}/task/update/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Updating task data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(fetchTasksDataByUserId(task.user.id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createTask = (task) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${Api}/task/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Creating task failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(fetchTasksDataByUserId(task.user.id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTask = (task) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${Api}/task/delete/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Deleting task failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(fetchTasksDataByUserId(task.user.id));
    } catch (error) {
      console.log(error);
    }
  };
};
