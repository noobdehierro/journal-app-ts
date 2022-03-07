import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChvvwiOOE5o3IFhxU1Kv1seX1yY76OoG0",
  authDomain: "journal-app-ts-cdcdd.firebaseapp.com",
  projectId: "journal-app-ts-cdcdd",
  storageBucket: "journal-app-ts-cdcdd.appspot.com",
  messagingSenderId: "636917714931",
  appId: "1:636917714931:web:3506ef834d78dcb13b8c86",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();
export {
  db,
  googleAuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
};
