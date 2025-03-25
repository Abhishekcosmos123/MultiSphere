import { call, put, takeLatest, CallEffect, PutEffect } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

interface ExampleData {
  id: number;
  title: string;
  description: string;
}

interface FetchDataResponse {
  data: ExampleData;
  status: number;
}

type SagaEffect = CallEffect | PutEffect;

// Example of a basic API call
function* fetchDataApi(): Generator<CallEffect, FetchDataResponse, unknown> {
  const response = yield call(fetch, '/api/example');
  const jsonData = yield call(() => (response as Response).json());
  return jsonData as FetchDataResponse;
}

// Example saga worker
function* handleFetchData(action: PayloadAction<void>): Generator<SagaEffect, void, unknown> {
  try {
    const data = yield call(fetchDataApi);
    yield put({ type: 'example/fetchDataSuccess', payload: data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put({ type: 'example/fetchDataFailure', payload: errorMessage });
  }
}

// Example saga watcher
export function* watchExample(): Generator<ReturnType<typeof takeLatest>, void, unknown> {
  yield takeLatest('example/fetchDataRequest', handleFetchData);
} 