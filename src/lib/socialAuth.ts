import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider, microsoftProvider, appleProvider } from "./firebaseConfig";

export const googleLogin = async () => {
    
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
};

export const facebookLogin = async () => {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;
};

export const microsoftLogin = async () => {
    const result = await signInWithPopup(auth, microsoftProvider);
    return result.user;
};

export const appleLogin = async () => {
    const result = await signInWithPopup(auth, appleProvider);
    return result.user;
};
