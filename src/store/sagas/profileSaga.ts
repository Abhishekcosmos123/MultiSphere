import { call, put, takeLatest } from "redux-saga/effects";
import {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} from "../slices/profileSlice";
import { authService } from "@/lib/api/services/authService";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleUpdateProfile(action: PayloadAction<{ formData: FormData; id: string }>): Generator<any, void, any> {
  try {
    const { formData, id } = action.payload;
    const data = yield call(authService.updateUserProfile, { id, formData });
    yield put(updateProfileSuccess({ user: data.data.user, message: data.message }));
  } catch (error: any) {
    yield put(updateProfileFailure(error.response?.data?.message || "Something went wrong"));
  }
}

export default function* profileSaga() {
  yield takeLatest(updateProfileRequest.type, handleUpdateProfile);
}
