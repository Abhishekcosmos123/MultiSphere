import { signInWithRedirect, getRedirectResult, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider, microsoftProvider, appleProvider } from "./firebaseConfig";
import { store } from "@/store";
import { loginSuccess } from "@/store/slices/authSlice";

const handleSocialLoginSuccess = (user: any) => {
  const userData = {
    email: user.email,
    name: user?.displayName || user?.email?.split('@')[0],
    role: 'User',
    token: user.accessToken,
    profileImage: user.photoURL
  };
  // @ts-ignore
  store.dispatch(loginSuccess(userData));
  localStorage.setItem('token', userData.token);
  localStorage.setItem('user', JSON.stringify(userData));
};

// Initialize redirect result handling
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      handleSocialLoginSuccess(result.user);
      return result.user;
    }
    return null;
  } catch (error) {
    console.error("Error handling redirect result:", error);
    return null;
  }
};

export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    handleSocialLoginSuccess(result.user);
    return result.user
  } catch (error) {
    console.error("Error initiating Google login:", error);
    throw error;
  }
};

export const facebookLogin = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    handleSocialLoginSuccess(result.user);
    return result.user
  } catch (error) {
    console.error("Error initiating Facebook login:", error);
    throw error;
  }
};

export const microsoftLogin = async () => {
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
     handleSocialLoginSuccess(result.user);
     return result.user;
  } catch (error) {
    console.error("Error initiating Microsoft login:", error);
    throw error;
  }
};

export const appleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    handleSocialLoginSuccess(result.user);
    return result.user
  } catch (error) {
    console.error("Error initiating Apple login:", error);
    throw error;
  }
};
