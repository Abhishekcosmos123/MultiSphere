import {
  getRedirectResult,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
  microsoftProvider,
  appleProvider,
} from "./firebaseConfig";
import { store } from "@/store";
import { loginSuccess, socialLoginRequest } from "@/store/slices/authSlice";
import { storage, StorageKeys } from '@/lib/utils/storage';

const handleSocialLoginSuccess = async (user: any, provider: string) => {
  try {
    const idToken = await user.getIdToken(); 

    const userData = {
      id: user.uid,
      email: user.email,
      name: user?.displayName || user?.email?.split("@")[0],
      role: "consumer",
      phone: user.phoneNumber || "",
      country_code: "",
      profileImage: user.photoURL,
    };
    
    store.dispatch(loginSuccess({
      data: {
        user: {
          id: userData.id,
          name: userData.name,
          phone: userData.phone,
          country_code: userData.country_code,
          role: userData.role,
          email: userData.email,
          profileImage: userData.profileImage,
        },
        token: {
          access: {
            token: idToken,
            expires: ""
          },
          refresh: {
            token: idToken,
            expires: ""
          }
        },
        status: true
      },
      message: "Login successful",
      success: true
    }));

    storage.set(StorageKeys.TOKEN, idToken);
    storage.setJson(StorageKeys.USER, userData);

    store.dispatch(
      socialLoginRequest({
        idToken,
        provider,
        role: userData.role,
        email: userData.email,
        phone: userData.phone,
        name: userData.name,
      })
    );
  } catch (error) {
    console.error("Error in handleSocialLoginSuccess:", error);
  }
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      await handleSocialLoginSuccess(result.user, "redirect");
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
    await handleSocialLoginSuccess(result.user, "google");
    return result.user;
  } catch (error) {
    console.error("Error initiating Google login:", error);
    throw error;
  }
};

export const facebookLogin = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    await handleSocialLoginSuccess(result.user, "facebook");
    return result.user;
  } catch (error) {
    console.error("Error initiating Facebook login:", error);
    throw error;
  }
};

export const microsoftLogin = async () => {
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
    await handleSocialLoginSuccess(result.user, "microsoft");
    return result.user;
  } catch (error) {
    console.error("Error initiating Microsoft login:", error);
    throw error;
  }
};

export const appleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    await handleSocialLoginSuccess(result.user, "apple");
    return result.user;
  } catch (error) {
    console.error("Error initiating Apple login:", error);
    throw error;
  }
};
