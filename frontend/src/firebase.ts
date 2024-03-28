// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  browserPopupRedirectResolver,
  browserSessionPersistence,
  initializeAuth,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKKEIhzGcTuHX94P2vs0CANHLbkMhrGD8",
  authDomain: "final-project-decf6.firebaseapp.com",
  projectId: "final-project-decf6",
  storageBucket: "final-project-decf6.appspot.com",
  messagingSenderId: "217514809616",
  appId: "1:217514809616:web:62e2ca80bdf69b13d8ed95",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: browserSessionPersistence,
  popupRedirectResolver: browserPopupRedirectResolver,
});
