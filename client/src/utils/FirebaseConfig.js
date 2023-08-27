import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCSpmRyGsv43PpSgtrY4z3XVi7IF6ohNMk",
    authDomain: "chat-vista-f7e3c.firebaseapp.com",
    projectId: "chat-vista-f7e3c",
    storageBucket: "chat-vista-f7e3c.appspot.com",
    messagingSenderId: "681769852441",
    appId: "1:681769852441:web:74071f4bef2f13e30d9488",
    measurementId: "G-KPZZW68XD6"
};

//  Initialise firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);