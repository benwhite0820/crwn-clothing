// this initialize app function creates an app instance for you based off of some type of config.
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// your own config is going to be able to allow you to make firebase actions, create actions to CRUD to your own specific instance of firebase.

const firebaseConfig = {
    apiKey: 'AIzaSyCGLVVwxckDcqSuwVavGL-XYi-YEXtA1eg',
    authDomain: 'crown-clothing-db-d3ca8.firebaseapp.com',
    projectId: 'crown-clothing-db-d3ca8',
    storageBucket: 'crown-clothing-db-d3ca8.appspot.com',
    messagingSenderId: '1030509477226',
    appId: '1:1030509477226:web:828b42fdf25724c4617913',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// a class
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    // what we need to do first is we need to see if there is an existing document reference.
    // i'm essentially saying, hey give me the document reference. inside of this database under the users collection with this user auth uid
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    // we can check if this doc exist or not by using exists() method
    const userSnapShot = await getDoc(userDocRef);
    // console.log(userSnapShot);
    // console.log(userSnapShot.exists());

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch (e) {
            console.log(e, 'error creating the user');
        }
    }
    return userDocRef;
};
