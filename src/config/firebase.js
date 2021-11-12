import { initializeApp,getApp  } from "firebase/app";
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";

import {getAuth,signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import {onSnapshot,increment,updateDoc,where,query,getFirestore,collection,addDoc,setDoc,doc,getDoc,getDocs} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAChpNE5NGQdbEQ-b6kLXhStVEmepcLZ7k",
  authDomain: "reactpracfirebase.firebaseapp.com",
  projectId: "reactpracfirebase",
  storageBucket: "reactpracfirebase.appspot.com",
  messagingSenderId: "1040004110273",
  appId: "1:1040004110273:web:8cca8486a7328343488140"
};
const app = initializeApp(firebaseConfig); 
const auth=getAuth()
const db = getFirestore();
const storage = getStorage();


// Initialize Firebase


export{
  signOut,
  getDownloadURL,
  uploadBytes,
  storage,
  ref,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    db,
    collection,
    addDoc,
    setDoc,
    doc,
    increment,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc,
    onSnapshot
    
}