import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvmlYWzBdOVb3oYEaAF5fiwDwHWD8VDfQ",
  authDomain: "drivecloneproject.firebaseapp.com",
  projectId: "drivecloneproject",
  storageBucket: "drivecloneproject.appspot.com",
  messagingSenderId: "836670153083",
  appId: "1:836670153083:web:983564e4b1b29b4df7ddde",
};

const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { db, storage, auth, provider };
