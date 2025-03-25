import { all } from 'redux-saga/effects';
import { watchExample } from './exampleSaga';

// Root saga that combines all sagas
export default function* rootSaga() {
  yield all([
    watchExample(),
  ]);
} 