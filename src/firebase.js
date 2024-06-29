import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDvgf76CeP0q2_I0zNF11fBculA5jzsLds",
  authDomain: "netflix-clone-25ec5.firebaseapp.com",
  projectId: "netflix-clone-25ec5",
  storageBucket: "netflix-clone-25ec5.appspot.com",
  messagingSenderId: "245885900543",
  appId: "1:245885900543:web:0c57fce85bcf2db9351eca"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async(email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
            toast.error(error.code.split('/')[1].split('-').join(" "))
        }
}

const logout = () => {
    signOut(auth);
}



export {auth, db, signup, login, logout};