import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { searchUsersRequest, searchUsersSuccess, searchUsersFailure, deleteUserSuccess, deleteUserFailure, deleteUserRequest, updateUserSuccess, updateUserFailure, updateUserRequest } from '@/store/slices/admin/userSlice';
import { authService, UpdateUser, UpdateUserPayload } from '@/lib/api/services/authService';

function* searchUsersSaga(action: PayloadAction<{ searchBy: string; searchValue: string }>): Generator<any, void, any> {
  try {
    const { searchBy, searchValue } = action.payload;
    const users = yield call(authService.searchUsers, searchBy, searchValue);
    yield put(searchUsersSuccess(users));
  } catch (error: any) {
    yield put(searchUsersFailure(error.message || 'Failed to fetch users'));
  }
}

function* deleteUserSaga(action: PayloadAction<string>) {
    try {
      const deletedUserId: string = yield call(authService.deleteUser, action.payload);
      yield put(deleteUserSuccess(deletedUserId));
    } catch (error: any) {
      yield put(deleteUserFailure(error.message || 'Failed to delete user'));
    }
  }

  function* handleUpdateUser(action: PayloadAction<UpdateUserPayload>): any {
    try {
      const response = yield call(
        authService.updateUser,
        action.payload
      );
      yield put(updateUserSuccess(response));
    } catch (error: any) {
      yield put(updateUserFailure(error.message || 'Something went wrong'));
    }
  }

export default function* userSaga() {
  yield takeLatest(searchUsersRequest.type, searchUsersSaga);
  yield takeLatest(deleteUserRequest.type, deleteUserSaga);
  yield takeLatest(updateUserRequest.type, handleUpdateUser);
}
