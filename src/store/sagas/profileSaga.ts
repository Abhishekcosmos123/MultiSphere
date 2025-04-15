import { call, put, takeLatest } from "redux-saga/effects";
import {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  updateUserSuccess,
  updateUserFailure,
  updateUserRequest,
  fetchModulesSuccess,
  fetchModulesFailure,
  fetchModulesRequest,
} from "../slices/profileSlice";
import { authService } from "@/lib/api/services/authService";
import { PayloadAction } from "@reduxjs/toolkit";
import { ProfileResponse } from "../../../types/profile";

function* handleUpdateProfile(action: PayloadAction<{ formData: FormData; id: string }>): Generator<any, void, any> {
  try {
    const { formData, id } = action.payload;
    const data = yield call(authService.updateUserProfile, { id, formData });
    yield put(updateProfileSuccess({ user: data.data.user, message: data.message }));
  } catch (error: any) {
    yield put(updateProfileFailure(error.response?.data?.message || "Something went wrong"));
  }
}

function* handleUpdateUser(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    const response: ProfileResponse = yield call(authService.updateUserById, action.payload);
    yield put(updateUserSuccess(response));
  } catch (error: any) {
    yield put(updateUserFailure(error?.response?.data?.message || "Something went wrong"))
  }
}

function* handleFetchModules(): Generator<any, void, any> {
  try {
    const response = yield call(authService.fetchModules);
    yield put(fetchModulesSuccess(response));
  } catch (error: any) {
    yield put(fetchModulesFailure(error.message || 'Something went wrong'));
  }
}

export default function* profileSaga() {
  yield takeLatest(updateProfileRequest.type, handleUpdateProfile);
  yield takeLatest(updateUserRequest.type, handleUpdateUser);
  yield takeLatest(fetchModulesRequest.type, handleFetchModules);
}
