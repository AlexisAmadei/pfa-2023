import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA3jdFFKrFSh4NQdDw005oN2mnfBKUeFPU",
  authDomain: "pfa-2023-7c76b.firebaseapp.com",
  projectId: "pfa-2023-7c76b",
  storageBucket: "pfa-2023-7c76b.appspot.com",
  messagingSenderId: "108574951103",
  appId: "1:108574951103:web:644c82b8c6f8360f5b680a",
  measurementId: "G-Q4YX1XKCKV",
  // databaseURL: "https://https://pfa-2023-7c76b-default-rtdb.europe-west1.firebasedatabase.app/.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const fakeUserUID = "yiRokmNDgGAc4czw1sIQ";
// export const realtimeDB = getDatabase(app);