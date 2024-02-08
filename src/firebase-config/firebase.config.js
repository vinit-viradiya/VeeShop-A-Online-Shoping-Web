import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-n13_xuc4jlqUyFDdiC5H734-ZEn4FK4",
  authDomain: "veeshop-4122d.firebaseapp.com",
  projectId: "veeshop-4122d",
  storageBucket: "veeshop-4122d.appspot.com",
  messagingSenderId: "911901185725",
  appId: "1:911901185725:web:dbd4bd56f1fe4939e449d4",
  measurementId: "G-D1Q2BDSCHC"
};

const app = initializeApp(firebaseConfig);
export const userAuth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);