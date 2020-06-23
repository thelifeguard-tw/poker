import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC-30HySY5vQ06dZSHuVlS8W6ZCHpCb_kY",
  authDomain: "lifeguards-poker-b7e01.firebaseapp.com",
  databaseURL: "https://lifeguards-poker-b7e01.firebaseio.com",
  projectId: "lifeguards-poker-b7e01",
  storageBucket: "lifeguards-poker-b7e01.appspot.com",
  messagingSenderId: "517298128329",
  appId: "1:517298128329:web:f050ea3e63e7c2c8ab1418",
  measurementId: "G-W24HQQM7DW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const signIn = (
  callback: (user: firebase.auth.UserCredential) => void
) => {
  firebase
    .auth()
    .signInAnonymously()
    .then((user) => {
      callback(user);
    })
    .catch(function (error) {
      console.log(error);
    });
};
