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
        }).then((result) => {
          localStorage.setItem("token", result.data.token);
          dispatch({
            type: "SET_TOKEN",
            token: result.data.token,
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};