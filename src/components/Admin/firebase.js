import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCkHlF8kO7x_cN9VLUCyow6mDF-95Ni4U0",
  authDomain: "website-e921e.firebaseapp.com",
  databaseURL: "https://website-e921e-default-rtdb.firebaseio.com",
  projectId: "website-e921e",
  storageBucket: "website-e921e.appspot.com",
  messagingSenderId: "684652704246",
  appId: "1:684652704246:web:123356dcc4eb8d7ea117d7",
  measurementId: "G-2H98WYEYZ2"
});

  // Initialize Firebase
  var db = firebaseApp.firestore();
  export const auth = getAuth(firebaseApp);
  export const database = getDatabase(firebaseApp);
  export const storage = getStorage(firebaseApp);
  export { db };