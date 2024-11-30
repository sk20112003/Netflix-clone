
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBmWaEauPx4ou8hO18dLTxaXwnDHr5r9ak",
  authDomain: "netflix-clone-cd30a.firebaseapp.com",
  projectId: "netflix-clone-cd30a",
  storageBucket: "netflix-clone-cd30a.firebasestorage.app",
  messagingSenderId: "700318734265",
  appId: "1:700318734265:web:b5d7b096cc8f16f194c868"
};


const app = initializeApp(firebaseConfig);

const auth= getAuth(app);

const db= getFirestore(app);

const signup =async(name,email,password)=>{

    try{

     const res=   await createUserWithEmailAndPassword(auth,email,password);
     const user= res.user;
     await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
     })
    }catch(error){
     console.log(error);
     toast.error(error.code.spilt('/')[1].spilt('-').join(" "));
    }
}

const login =async()=>{
    try{
       
        await signInWithEmailAndPassword(auth,email,password);
        
    }catch(error){
           console.log(error);
           toast.error(error.code.spilt('/')[1].spilt('-').join(" "));
    }
}

const logout=()=>{
    signOut(auth);
}

export {auth, db, login ,signup, logout};