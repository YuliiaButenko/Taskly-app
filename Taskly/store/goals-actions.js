import { goalsActions } from "./goalsSlice";
import { Api } from "../components/util/Api";

export const fetchGoalsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${Api}/goals`, init);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const goalData = await fetchData();

      dispatch(goalsActions.replaceGoal({ goalList: goalData }));
    } catch (error) {
      console.log("error");
    }
  };
};

export const fetchGoalsDataByUserId = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${Api}/goals/user/${userId}`, init);

      if (!response.ok) {
        throw new Error("Could not fetch goals data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const goalData = await fetchData();

      dispatch(goalsActions.replaceGoal({ goalList: goalData }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendGoalsData = (goal) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${Api}/goals/update/${goal.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goal),
      });

      if (!response.ok) {
        throw new Error("Updating goal data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(fetchGoalsDataByUserId(goal.user.id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createGoal = (goal) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${Api}/goals/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goal),
      });

      if (!response.ok) {
        throw new Error("Creating goal failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(fetchGoalsDataByUserId(goal.user.id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteGoal = (goal) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${Api}/goals/delete/${goal.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Deleting goal failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(fetchGoalsDataByUserId(goal.user.id));
    } catch (error) {
      console.log(error);
    }
  };
};
