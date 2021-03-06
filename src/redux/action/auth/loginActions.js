import axios from "axios";
// import { history } from "../../../history";
import { config } from "../../../configs/firebaseConfig";
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

let firebaseAuth = firebase.auth();

export const setToken = (token) => {
  return (dispatch) => dispatch({ type: "SET_TOKEN", token: token });
};

export const checking = (status) => {
  return (dispatch) => dispatch({ type: "CHECKING_TOKEN", access: status });
};

export const loginWithGoogle = () => {
  return (dispatch) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth
      .signInWithPopup(provider)
      .then(function (result) {
        axios({
          method: "put",
          url: "http://localhost:4040/auth/",
          data: {
            email: result.user.email,
            name: result.user.displayName,
          },
        }).then((results) => {
          localStorage.setItem("token", results.data.token);
          window.location.reload();
          dispatch({
            type: "SET_TOKEN",
            token: results.data.token,
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const tokenChecking = (token) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: "http://localhost:4040/auth/token",
      data: {
        token: token,
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };
};
