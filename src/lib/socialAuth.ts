import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider, microsoftProvider, appleProvider } from "./firebaseConfig";
import { store } from "@/store";
import { loginSuccess } from "@/store/slices/authSlice";

const handleSocialLoginSuccess = (user: any) => {
  const userData = {
    email: user.email,
    name: user.displayName || user.email.split('@')[0],
    role: 'user',
    token: user.accessToken,
    profileImage: user.photoURL
  };
  store.dispatch(loginSuccess(userData));
  localStorage.setItem('token', userData.token);
  localStorage.setItem('user', JSON.stringify(userData));
};

export const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    handleSocialLoginSuccess(result.user);
    return result.user;
};

export const facebookLogin = async () => {
    const result = await signInWithPopup(auth, facebookProvider);
    handleSocialLoginSuccess(result.user);
    return result.user;
};

export const microsoftLogin = async () => {
    const result = await signInWithPopup(auth, microsoftProvider);
    handleSocialLoginSuccess(result.user);
    return result.user;
};

export const appleLogin = async () => {
    const result = await signInWithPopup(auth, appleProvider);
    handleSocialLoginSuccess(result.user);
    return result.user;
};
