import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  adminLoginRequest,
  adminLoginSuccess,
  adminLoginFailure,
  adminLogoutRequest,
  adminLogoutSuccess,
  adminLogoutFailure,
  verifyAdminOtpRequestMobile,
  verifyAdminOtpSuccessMobile,
  verifyAdminOtpFailureMobile,
  adminForgetPasswordRequest,
  adminForgetPasswordSuccess,
  adminForgetPasswordFailure,
  adminVerifyForgetPasswordOtpRequest,
  adminVerifyForgetPasswordOtpSuccess,
  adminVerifyForgetPasswordOtpFailure,
  adminResetPasswordRequest,
  adminResetPasswordSuccess,
  adminResetPasswordFailure,
} from '@/store/slices/admin/authAdminSlice';
import { adminAuthService, LoginCredentials, LogoutToken } from '@/lib/api/services/admin/adminAuthService.ts';
import { storage, StorageKeys } from '@/lib/utils/storage';

/**
 * Saga worker for handling login process
 * - Makes API call
 * - Handles success by storing token and user data
 * - Handles failure by dispatching error
 * - Redirects to home page on success
 */
export function* adminLoginSaga(action: PayloadAction<LoginCredentials>): Generator {
  try {
    const response = yield call(adminAuthService.adminLogin, action.payload);
    yield put(adminLoginSuccess(response));
    // Store in storage
    storage.set(StorageKeys.TOKEN, response.data.token.refresh.token);
    storage.setJson(StorageKeys.USER, response.data.user);
  } catch (error: any) {
    yield put(adminLoginFailure(error.message));
  }
}

/**
 * Saga worker for handling OTP verification process
 */
export function* verifyAdminOtpMobileSaga(action: PayloadAction<{ otp: string }>): Generator {
  try {
    const response = yield call(adminAuthService.verifyAdminOtpMobile, action.payload);
    yield put(verifyAdminOtpSuccessMobile(response));
    storage.set(StorageKeys.TOKEN, response.data.token.refresh.token);
    storage.setJson(StorageKeys.USER, response.user);
  } catch (error: any) {
    yield put(verifyAdminOtpFailureMobile(error.message));
  }
}

/**
 * Saga worker for handling logout process
 */
export function* adminLogoutSaga(action: PayloadAction<LogoutToken>): Generator {
  try {
    yield call(adminAuthService.adminLogout, action.payload);
    yield put(adminLogoutSuccess());
    storage.remove(StorageKeys.TOKEN);
    storage.remove(StorageKeys.USER);
    window.location.href = '/admin/login';
  } catch (error: any) {
    yield put(adminLogoutFailure(error.message));
  }
}

function* adminForgetPasswordSaga(action: ReturnType<typeof adminForgetPasswordRequest>): Generator<any, void, any> {
  try {
    const response = yield call(adminAuthService.adminForgetPassword, action.payload);
    yield put(adminForgetPasswordSuccess(response));
  } catch (error: any) {
    yield put(adminForgetPasswordFailure(error.message));
  }
}

function* adminVerifyForgetPasswordOtpSaga(action: ReturnType<typeof adminVerifyForgetPasswordOtpRequest>): Generator<any, void, any> {
  try {
    const response = yield call(adminAuthService.adminVerifyforgetPasswordOTP, action.payload);
    yield put(adminVerifyForgetPasswordOtpSuccess(response));
  } catch (error: any) {
    yield put(adminVerifyForgetPasswordOtpFailure(error.message));
  }
}

function* adminResetPasswordSaga(action: ReturnType<typeof adminResetPasswordRequest>): Generator<any, void, any> {
  try {
    const response = yield call(adminAuthService.adminResetPassword, action.payload);
    yield put(adminResetPasswordSuccess(response));
  } catch (error: any) {
    yield put(adminResetPasswordFailure(error.message));
  }
}

/**
 * Root auth saga that watches for auth actions
 * - Handles login requests
 * - Handles logout requests
 * - Handles get current user requests
 * - Handles OTP verification requests
 */
export default function* adminAuthSaga() {
  yield takeLatest(adminLoginRequest.type, adminLoginSaga);
  yield takeLatest(adminLogoutRequest.type, adminLogoutSaga);
  yield takeLatest(verifyAdminOtpRequestMobile.type, verifyAdminOtpMobileSaga);
  yield takeLatest(adminForgetPasswordRequest.type, adminForgetPasswordSaga);
  yield takeLatest(adminVerifyForgetPasswordOtpRequest.type, adminVerifyForgetPasswordOtpSaga);
  yield takeLatest(adminResetPasswordRequest.type, adminResetPasswordSaga);
}
