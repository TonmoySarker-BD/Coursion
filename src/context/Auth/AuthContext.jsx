import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from "./firebase.init";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

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

    const signInWithGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, GithubProvider);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = async (userInfo) => {
        setLoading(true);
        try {
            await updateProfile(auth.currentUser, userInfo);
        } catch (err) {
            console.error("Failed to update profile:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };


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
        return <div className="max-w-5xl mx-auto py-10 px-4 text-center">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-500 mx-auto"></div>
            <p className="mt-4 ">Loading User...</p>
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
        signInWithGoogle,
        signInWithGithub
    };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};