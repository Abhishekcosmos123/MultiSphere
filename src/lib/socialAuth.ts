import { signInWithPopup } from "firebase/auth";
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
  store.dispatch(loginSuccess(userData));
  localStorage.setItem('token', userData.token);
  localStorage.setItem('user', JSON.stringify(userData));
};

export const googleLogin = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        handleSocialLoginSuccess(user);
        user.getIdToken().then((idToken) => {
          console.log("ID Token:", idToken);
        });
      });
};

export const facebookLogin = async () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        handleSocialLoginSuccess(user);
        user.getIdToken().then((idToken) => {
          console.log("ID Token:", idToken);
        });
      })
      .catch((error) => {
        console.log(error);
      });
};

export const microsoftLogin = async () => {
    const result = await signInWithPopup(auth, microsoftProvider);
    handleSocialLoginSuccess(result.user);
    return result.user;
};

export const appleLogin = async () => {
    signInWithPopup(auth, appleProvider)
      .then((result) => {
        const user = result.user;
        handleSocialLoginSuccess(user);
        user.getIdToken().then((idToken) => {
          console.log("ID Token:", idToken);
        });
      })
      .catch((error) => {
        console.log(error);
      });
};
