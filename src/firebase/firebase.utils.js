import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCQRaIiv4O-8ql8urMwLw9KY_QKd8G3a3g",
  authDomain: "crwn-db-8e70a.firebaseapp.com",
  projectId: "crwn-db-8e70a",
  storageBucket: "crwn-db-8e70a.appspot.com",
  messagingSenderId: "883147329074",
  appId: "1:883147329074:web:57bdc64afe98a9230db62b",
};

export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log("error creating user ", error.message);
        }
    }
    return userRef;

}

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;