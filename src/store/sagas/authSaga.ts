import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
} from "../slices/authSlice";
import { LoginFormData, RegisterFormData } from "@/lib/validations/auth";

/**
 * Makes API call to login endpoint
 * @param data - Login form data (email and password)
 * @returns Promise with user data and token
 * @throws Error if login fails
 */
async function loginApi(data: LoginFormData) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
}

/**
 * Makes API call to register endpoint
 * @param data - Registration form data
 * @returns Promise with user data and token
 * @throws Error if registration fails
 */
async function registerApi(data: RegisterFormData) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
}

/**
 * Saga worker for handling login process
 * - Makes API call
 * - Handles success by storing token and user data
 * - Handles failure by dispatching error
 * - Redirects to home page on success
 */
export function* loginSaga(action: PayloadAction<LoginFormData>) {
  try {
    const response = yield call(loginApi, action.payload);
    yield put(loginSuccess(response));

    // Store in localStorage
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    // Redirect to home
    window.location.href = "/";
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

/**
 * Saga worker for handling registration process
 * - Makes API call
 * - Handles success by storing token and user data
 * - Handles failure by dispatching error
 * - Redirects to home page on success
 */
export function* registerSaga(action: PayloadAction<RegisterFormData>) {
  try {
    const response = yield call(registerApi, action.payload);
    yield put(registerSuccess(response));

    // Store in localStorage
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    // Redirect to home
    window.location.href = "/";
  } catch (error: any) {
    yield put(registerFailure(error.message));
  }
}

/**
 * Root auth saga that watches for auth actions
 * - Handles login requests
 * - Handles registration requests
 */
export function* watchAuth() {
  yield takeLatest("auth/loginRequest", loginSaga);
  yield takeLatest("auth/registerRequest", registerSaga);
}
