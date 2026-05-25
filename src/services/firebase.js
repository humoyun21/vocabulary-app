
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCPMoc47mHCAdf2lM8fK8zY4K7Wek-klV4",
  authDomain: "vocabulary-startup.firebaseapp.com",
  projectId: "vocabulary-startup",
  storageBucket: "vocabulary-startup.firebasestorage.app",
  messagingSenderId: "520426048306",
  appId: "1:520426048306:web:32f76bc4bdb7d3bc05e52b",
  measurementId: "G-X0GQTKYYNJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);