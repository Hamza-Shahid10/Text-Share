import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYRsVNDJefQb9D75Dp01x2yXo4QCkZgWI",
  authDomain: "text-share-73a47.firebaseapp.com",
  projectId: "text-share-73a47",
  storageBucket: "text-share-73a47.firebasestorage.app",
  messagingSenderId: "895143367595",
  appId: "1:895143367595:web:cce86fd995cf8713a338ee",
  measurementId: "G-DFRYR822KP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);