import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlFSyMqJ1IZGmrOzOvO4tpRO6hc2gyGPw",
  authDomain: "testing-edf48.firebaseapp.com",
  databaseURL: "https://testing-edf48-default-rtdb.firebaseio.com",
  projectId: "testing-edf48",
  storageBucket: "testing-edf48.appspot.com",
  messagingSenderId: "322971047410",
  appId: "1:322971047410:web:b14b7987e49e1011ef876b",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export { auth, firestore };
