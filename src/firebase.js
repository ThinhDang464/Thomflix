// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API,
  authDomain: "disney-clone-stream.firebaseapp.com",
  projectId: "disney-clone-stream",
  storageBucket: "disney-clone-stream.firebasestorage.app",
  messagingSenderId: "726512602072",
  appId: "1:726512602072:web:0b359f086d12922a2e00ad",
  measurementId: "G-4HLFYSC32K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

// Export services
export { auth, provider, storage };
export default db;
