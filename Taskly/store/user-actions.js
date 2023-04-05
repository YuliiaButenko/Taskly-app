import { userActions } from "./userSlice";
import { Api } from "../components/util/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const LOCAL_STORAGE_TOKEN_KEY = "productivePeopleToken";

export const login = (username, password) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      };

      const response = await fetch(
        "http://localhost:8080/user/login/authenticate",
        request
      );

      if (response.ok) {
        const { token } = await response.json();
        dispatch(setUser(token));
      } else {
        dispatch(userActions.clearError());
        const report = await response.json();
        for (let i = 0; i < report.length; i++) {
          dispatch(userActions.logError(report[i]));
        }
      }
    };
    dispatch(userActions.clearError());
    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
      dispatch(userActions.logError("Password is incorrect"));
    }
  };
};

export const register = (
  fullName,
  username,
  password,
  email,
  color,
  pictureUrl
) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          email,
          color,
          pictureUrl,
        }),
      };

      const response = await fetch(
        "http://localhost:8080/user/register/authenticate",
        request
      );
      dispatch(userActions.clearError());
      if (response.ok) {
        const { token } = await response.json();
        dispatch(setUser(token));
      } else {
        const report = await response.json();
        for (let i = 0; i < report.length; i++) {
          dispatch(userActions.logError(report[i]));
        }
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = (dispatch) => {
  dispatch(userActions.clearError());
  userActions.logoutUser();
};

function setUser(token) {
  return async (dispatch) => {
    const sendRequest = async () => {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${Api}/user/${username}`, init);
      const body = await response.json();
      return body;
    };

    const { sub: username } = jwtDecode(token);

    try {
      const body = await sendRequest();

      const userInfo = {
        fullName: body.fullName,
        username: username,
        id: body.id,
        email: body.email,
        token: token,
        color: body.color ? body.color : "blue",
        pictureUrl: body.pictureUrl,
      };
      dispatch(userActions.clearError());
      await AsyncStorage.setItem("user", JSON.stringify(userInfo));
      await dispatch(userActions.loginUser(userInfo));
    } catch (error) {
      console.log(error);
    }
  };
}

export const updateUserInfo = (user) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${Api}/user/update/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const { token } = await response.json();
        dispatch(setUser(token));
      } else {
        dispatch(userActions.clearError());
        const report = await response.json();
        for (let i = 0; i < report.length; i++) {
          await dispatch(userActions.logError(report[i]));
        }
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("error");
    }
  };
};
