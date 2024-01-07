import {initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBCKgEHXb5C7NqWS-yr4fQwP1kkQFR53dI",
    authDomain: "crwn-clothing-db-8900e.firebaseapp.com",
    projectId: "crwn-clothing-db-8900e",
    storageBucket: "crwn-clothing-db-8900e.appspot.com",
    messagingSenderId: "822880537780",
    appId: "1:822880537780:web:211675a8586ef17c2b9be1"
  };
  

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signWithGooglePopup = () => signInWithPopup(auth,provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt
      })
    }catch(error){
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef
}