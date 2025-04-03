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
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserFailure,
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
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  verifyForgetPasswordOtpSuccess,
  verifyForgetPasswordOtpFailure
} from '../slices/authSlice';
import { authService, LoginCredentials, RegisterData } from '@/lib/api/services/authService';

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
    // Store in localStorage
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
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
    // Handle success (e.g., redirect or show success message)
  } catch (error: any) {
    yield put(verifyOtpFailureMobile(error.message));
  }
}

/**
 * Saga worker for handling logout process
 */
export function* logoutSaga(): Generator {
  try {
    yield call(authService.logout);
    yield put(logoutSuccess());
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login
    window.location.href = '/login';
  } catch (error: any) {
    yield put(logoutFailure(error.message));
  }
}

/**
 * Saga worker for getting current user
 */
export function* getCurrentUserSaga(): Generator {
  try {
    const user = yield call(authService.getCurrentUser);
    yield put(getCurrentUserSuccess(user));
  } catch (error: any) {
    yield put(getCurrentUserFailure(error.message));
  }
}

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
  yield takeLatest(getCurrentUserRequest.type, getCurrentUserSaga);
  yield takeLatest(verifyOtpRequest.type, verifyOtpSaga);
  yield takeLatest(verifyOtpRequestMobile.type, verifyOtpMobileSaga);
  yield takeLatest(forgetPasswordRequest.type, forgetPasswordSaga);
  yield takeLatest(verifyForgetPasswordOtpRequest.type, verifyForgetPasswordOtpSaga);
  yield takeLatest(resetPasswordRequest.type, resetPasswordSaga);
}
