// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrMseIbo9ScFF3j9VGG2SFs9F3j7s2EXs",
  authDomain: "realtor-clone-react-7559a.firebaseapp.com",
  projectId: "realtor-clone-react-7559a",
  storageBucket: "realtor-clone-react-7559a.appspot.com",
  messagingSenderId: "1037376827028",
  appId: "1:1037376827028:web:a01ee617b7994e0d18ce81"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
