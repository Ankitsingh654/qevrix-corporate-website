// ✅ src/firebaseConfig.js

// Import core Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsr7zq8nDbnrULEqXPEqD6G7859mBwjfA",
  authDomain: "qevrix-6a22d.firebaseapp.com",
  projectId: "qevrix-6a22d",
  storageBucket: "qevrix-6a22d.appspot.com", // ✅ fixed: remove ".firebasestorage.app"
  messagingSenderId: "903828878548",
  appId: "1:903828878548:web:4eb6c4365e809788113741",
  measurementId: "G-S9NK2444HB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth for use in login/signup pages
export const auth = getAuth(app);

export default app;
