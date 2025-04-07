import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFailure,
  verifyOtpRequestMobile,
  verifyOtpSuccessMobile,
  verifyOtpFailureMobile,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  verifyForgetPasswordOtpRequest,
  verifyForgetPasswordOtpSuccess,
  verifyForgetPasswordOtpFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  socialLoginRequest,
  socialLoginSuccess,
  socialLoginFailure,
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure
} from '../slices/authSlice';
import { authService, LoginCredentials, LogoutToken, RegisterData, SocialLoginData } from '@/lib/api/services/authService';
import { storage, StorageKeys } from '@/lib/utils/storage';

/**
 * Saga worker for handling login process
 * - Makes API call
 * - Handles success by storing token and user data
 * - Handles failure by dispatching error
 * - Redirects to home page on success
 */
export function* loginSaga(action: PayloadAction<LoginCredentials>): Generator {
  try {
    const response = yield call(authService.login, action.payload);
    yield put(loginSuccess(response));
    // Store in storage
    storage.set(StorageKeys.TOKEN, response.data.token.refresh.token);
    storage.setJson(StorageKeys.USER, response.user);
    
    // Redirect to home
    // window.location.href = '/';
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

/**
 * Saga worker for handling registration process
 */
export function* registerSaga(action: PayloadAction<RegisterData>): Generator {
  try {
    const response = yield call(authService.register, action.payload);
    yield put(registerSuccess(response));
    // Store in localStorage
    // localStorage.setItem('token', response.token);
    // localStorage.setItem('user', JSON.stringify(response.user));
  } catch (error: any) {
    yield put(registerFailure(error.message));
  }
}

/**
 * Saga worker for handling OTP verification process
 */
export function* verifyOtpSaga(action: PayloadAction<{ otp: string }>): Generator {
  try {
    // Assuming the OTP verification API is implemented in authService
    const response = yield call(authService.verifyOtp, action.payload);
    yield put(verifyOtpSuccess(response));
    storage.set(StorageKeys.TOKEN, response.data.token.refresh.token);
    // Handle success (e.g., redirect or show success message)
  } catch (error: any) {
    yield put(verifyOtpFailure(error.message));
  }
}

/**
 * Saga worker for handling OTP verification process
 */
export function* verifyOtpMobileSaga(action: PayloadAction<{ otp: string }>): Generator {
  try {
    // Assuming the OTP verification API is implemented in authService
    const response = yield call(authService.verifyOtpMobile, action.payload);
    yield put(verifyOtpSuccessMobile(response));
    storage.set(StorageKeys.TOKEN, response.data.token.refresh.token);
    storage.setJson(StorageKeys.USER, response.user);
    // Handle success (e.g., redirect or show success message)
  } catch (error: any) {
    yield put(verifyOtpFailureMobile(error.message));
  }
}

/**
 * Saga worker for handling logout process
 */
export function* logoutSaga(action: PayloadAction<LogoutToken>): Generator {
  try {
    const response = yield call(authService.logout, action.payload);
    yield put(logoutSuccess());
    // Clear storage
    storage.remove(StorageKeys.TOKEN);
    storage.remove(StorageKeys.USER);
    // Redirect to login
    window.location.href = '/';
  } catch (error: any) {
    yield put(logoutFailure(error.message));
  }
}

/**
 * Saga worker for getting current user
 */
// export function* getCurrentUserSaga(): Generator {
//   try {
//     const user = yield call(authService.getCurrentUser);
//     yield put(getCurrentUserSuccess(user));
//   } catch (error: any) {
//     yield put(getCurrentUserFailure(error.message));
//   }
// }

function* forgetPasswordSaga(action: ReturnType<typeof forgetPasswordRequest>): Generator<any, void, any> {
  try {
    const response = yield call(authService.forgetPassword, action.payload);
    yield put(forgetPasswordSuccess(response));
  } catch (error: any) {
    yield put(forgetPasswordFailure(error.message));
  }
}

function* verifyForgetPasswordOtpSaga(action: ReturnType<typeof verifyForgetPasswordOtpRequest>): Generator<any, void, any> {
  try {
    const response = yield call(authService.verifyforgetPasswordOTP, action.payload);
    yield put(verifyForgetPasswordOtpSuccess(response));
  } catch (error: any) {
    yield put(verifyForgetPasswordOtpFailure(error.message));
  }
}

function* resetPasswordSaga(action: ReturnType<typeof resetPasswordRequest>): Generator<any, void, any> {
  try {
    const response = yield call(authService.resetPassword, action.payload);
    yield put(resetPasswordSuccess(response));
  } catch (error: any) {
    yield put(resetPasswordFailure(error.message));
  }
}

/**
 * Saga worker for handling social login process
 */
export function* socialLoginSaga(action: PayloadAction<SocialLoginData>): Generator {
  try {
    const response = yield call(authService.socialLogin, action.payload);
    yield put(socialLoginSuccess(response));
    // Store in storage
    storage.setJson(StorageKeys.TOKEN, response.data.token);
    storage.setJson(StorageKeys.USER, response.data.user);
  } catch (error: any) {
    yield put(socialLoginFailure(error.message));
  }
}

export function* getUsersSaga(action: PayloadAction<{ role: string }>): Generator {
  try {
    const response = yield call([authService, authService.getUsers], action.payload.role);
    yield put(getUsersSuccess(response));
  } catch (error: any) {
    yield put(getUsersFailure(error.message));
  }
}

/**
 * Root auth saga that watches for auth actions
 * - Handles login requests
 * - Handles logout requests
 * - Handles get current user requests
 * - Handles OTP verification requests
 */
export function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
  // yield takeLatest(getCurrentUserRequest.type, getCurrentUserSaga);
  yield takeLatest(verifyOtpRequest.type, verifyOtpSaga);
  yield takeLatest(verifyOtpRequestMobile.type, verifyOtpMobileSaga);
  yield takeLatest(forgetPasswordRequest.type, forgetPasswordSaga);
  yield takeLatest(verifyForgetPasswordOtpRequest.type, verifyForgetPasswordOtpSaga);
  yield takeLatest(resetPasswordRequest.type, resetPasswordSaga);
  yield takeLatest(socialLoginRequest.type, socialLoginSaga);
  yield takeLatest(getUsersRequest.type, getUsersSaga)
}
