import { createContext, useState, useEffect } from 'react';
import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// this provider is where it's going to receive the value, which is going to hold the actual contextual values.
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsbscribe = onAuthStateChangedListener((user) => {
            if (user) createUserDocumentFromAuth(user);
            setCurrentUser(user);
        });
        return unsbscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
