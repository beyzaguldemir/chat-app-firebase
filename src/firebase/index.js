// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// auth kurulumu için importlar
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX8aQy4lyhENDCxU5NF8TRDI8wN009T-c",
  authDomain: "proje2-8c5b7.firebaseapp.com",
  projectId: "proje2-8c5b7",
  storageBucket: "proje2-8c5b7.appspot.com",
  messagingSenderId: "323505788066",
  appId: "1:323505788066:web:19b1fa0e9b8bc4c8e6b3fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// kimlik dogrulamanın hizmetinin referansını al
export const auth=getAuth(app)

// google saglayıcısın kurulumu
export const provider=new GoogleAuthProvider()

// veri tabanının referansını al.
export const db=getFirestore(app)