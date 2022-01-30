
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBzkoLSz2b0p-oLpo0PyW-Co_045g6Kzv0",
  authDomain: "fir-crud-bc2bb.firebaseapp.com",
  projectId: "fir-crud-bc2bb",
  storageBucket: "fir-crud-bc2bb.appspot.com",
  messagingSenderId: "906197043342",
  appId: "1:906197043342:web:a921014abc6170042d61df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();