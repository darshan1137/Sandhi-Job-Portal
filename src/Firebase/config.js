import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4wEwaEetIVKxBUaU36YZlvPxDFgPhqr0",
  authDomain: "sandhi-259cf.firebaseapp.com",
  projectId: "sandhi-259cf",
  storageBucket: "sandhi-259cf.appspot.com",
  messagingSenderId: "542189072359",
  appId: "1:542189072359:web:2c9d03649850e3328d9742",
  measurementId: "G-DRKEGMHH1V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const db2 = getDatabase(app);

export {
  db,
  db2,
  collection,
  doc,
  auth,
  storage,
  setDoc,
  updateDoc,
  arrayUnion,
  getDocs,
};
