// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

let app;
let analytics;
let database;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkjTe1pSMgNPlmoZMYuKAK2j0lBeY-JPg",
  authDomain: "future-fungi.firebaseapp.com",
  databaseURL: "https://future-fungi-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "future-fungi",
  storageBucket: "future-fungi.appspot.com",
  messagingSenderId: "731710584041",
  appId: "1:731710584041:web:f8bb67eba025e5b612ac78",
  measurementId: "G-9DVZ8762KN"
};

if (typeof window !== 'undefined') {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  database = getDatabase(app);
}

export { app, analytics, database, firebaseConfig };
