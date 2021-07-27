import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics"
import { fireConfig } from "./fire";

const fireapp = firebase.initializeApp(fireConfig);
const db = fireapp.firestore();
const auth = fireapp.auth();
// const storage = fireapp.storage().ref();
// auth
//   .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
//   .catch((e) => {
//     console.log(e);
//   })
//   .then(() => {
//     console.log("Auth persistence offline");
//   });
// db.enablePersistence()
//   .then(() => console.log("Firestore offline persistence enabled"))
//   .catch((e) => {
//     console.log("Firestore offline persistence failed to enable" + e);
//   });
const analyticsApp = fireapp.analytics()
// analyticsApp.setAnalyticsCollectionEnabled(true)
console.log(fireapp)
export { db, auth,analyticsApp  };
