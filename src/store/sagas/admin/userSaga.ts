import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { searchUsersRequest, searchUsersSuccess, searchUsersFailure } from '@/store/slices/admin/userSlice';
import { authService } from '@/lib/api/services/authService';

function* searchUsersSaga(action: PayloadAction<{ searchBy: string; searchValue: string }>): Generator<any, void, any> {
  try {
    const { searchBy, searchValue } = action.payload;
    const users = yield call(authService.searchUsers, searchBy, searchValue);
    yield put(searchUsersSuccess(users));
  } catch (error: any) {
    yield put(searchUsersFailure(error.message || 'Failed to fetch users'));
  }
}

export default function* userSaga() {
  yield takeLatest(searchUsersRequest.type, searchUsersSaga);
}
