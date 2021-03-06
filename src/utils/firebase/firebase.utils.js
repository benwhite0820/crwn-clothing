// this initialize app function creates an app instance for you based off of some type of config.
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';

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

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
};

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformaton = {}
) => {
    if (!userAuth) return;
    // what we need to do first is we need to see if there is an existing document reference.
    // i'm essentially saying, hey give me the document reference. inside of this database under the users collection with this user auth uid
    const userDocRef = doc(db, 'users', userAuth.uid);
    // we can check if this doc exist or not by using exists() method
    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformaton,
            });
        } catch (e) {
            console.log(e, 'error creating the user');
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

// onAuthStateChanged ????????????????????????????????????signin or signout ????????????????????? function, ????????????????????? callback
export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);
