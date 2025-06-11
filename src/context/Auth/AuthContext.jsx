import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from "./firebase.init";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (userInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo);
    }

    const forgotPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    useState(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-xl text-success "></span>
        </div>;
    }

    const authInfo = {
        createUser,
        signInUser,
        loading,
        setLoading,
        user,
        setUser,
        updateUser,
        logout,
        forgotPassword,
        signInWithGoogle
    };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};