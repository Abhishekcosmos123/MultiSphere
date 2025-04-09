import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AdminProfilePayload, AdminProfileResponse } from '../../../../types/admin';
import {
  updateAdminProfileFailure,
  updateAdminProfileRequest,
  updateAdminProfileSuccess,
} from '@/store/slices/admin/adminSlice';
import { updateAdminProfile } from '@/lib/api/services/admin/admin';
import { AxiosResponse } from 'axios';

type UpdateAdminProfileActionPayload = {
  id: string;
  payload: AdminProfilePayload;
};

function* handleUpdateAdminProfile(
  action: PayloadAction<UpdateAdminProfileActionPayload>
): any {
  try {
    const { id, payload } = action.payload;
    const response = yield call(updateAdminProfile, id, payload);
    yield put(updateAdminProfileSuccess(response));
  } catch (error: any) {
    yield put(updateAdminProfileFailure(error?.response?.data?.message || 'Something went wrong'));
  }
}

export default function* adminSaga() {
  yield takeLatest(updateAdminProfileRequest.type, handleUpdateAdminProfile);
}

// function* handleUpdateUser(action: PayloadAction<UpdateUserPayload>): any {