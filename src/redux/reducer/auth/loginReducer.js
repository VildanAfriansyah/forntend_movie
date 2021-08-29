import { updateObject } from "../../utility";

export const login = (
  state = {
    token: localStorage.getItem("token"),
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_WITH_EMAIL": {
      return { ...state, values: action.payload };
    }
    case "SET_TOKEN": {
      return { ...state, token: action.token };
    }
    default: {
      return state;
    }
  }
};
