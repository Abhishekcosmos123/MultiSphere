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
import { loginSuccess, socialLoginRequest } from "@/store/slices/authSlice"; // Ensure this import is correct

const handleSocialLoginSuccess = async (user: any, provider: string) => {
  try {
    const idToken = await user.getIdToken(); // ✅ Get valid Firebase ID token

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

    // ✅ Store in localStorage
    localStorage.setItem("token", idToken);
    localStorage.setItem("user", JSON.stringify(userData));

    // ✅ Dispatch for backend verification
    // store.dispatch(
    //   socialLoginRequest({
    //     idToken,
    //     provider,
    //     role: userData.role,
    //     email: userData.email,
    //     phone: userData.phone,
    //     name: userData.name,
    //   })
    // );
  } catch (error) {
    console.error("Error in handleSocialLoginSuccess:", error);
  }
};

// 🔄 Handle redirect-based login results (optional)
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

// 🌐 Google login
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

// 📘 Facebook login
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

// 🧑‍💼 Microsoft login
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

// 🍎 Apple login
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
