// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZPM4-K3gBkJUgqwdhTDYQUnfNmbM8aDA",
  authDomain: "bdmarriage-5a590.firebaseapp.com",
  projectId: "bdmarriage-5a590",
  storageBucket: "bdmarriage-5a590.firebasestorage.app",
  messagingSenderId: "410212550735",
  appId: "1:410212550735:web:5c9fae14062f8681ae023a",
  measurementId: "G-TZS2QZPLHG",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const fireStore = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { fireStore, auth, analytics };
