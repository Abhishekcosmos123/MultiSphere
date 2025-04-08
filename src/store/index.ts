import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import authReducer from './slices/authSlice';
import exampleReducer from './slices/exampleSlice';
import { authSaga } from './sagas/authSaga';
import { watchExample } from './sagas/exampleSaga';
import profileSaga from './sagas/profileSaga';
import profileReducer from './slices/profileSlice';
import usersReducer from './slices/admin/userSlice';
import userSaga from './sagas/admin/userSaga';
import adminAuthSaga from './sagas/admin/authAdminSaga'
import adminAuthReducer from './slices/admin/authAdminSlice';

/**
 * Root saga that combines all individual sagas
 * Currently includes:
 * - Authentication sagas (login, register)
 * - Example sagas
 */
function* rootSaga() {
  yield all([authSaga(), profileSaga(), userSaga(), watchExample(), adminAuthSaga()]);
}

// Create saga middleware for handling side effects
const sagaMiddleware = createSagaMiddleware();

/**
 * Configure Redux store with:
 * - Auth reducer for handling authentication state
 * - Example reducer for handling example data
 * - Saga middleware for handling side effects
 * - Disabled thunk middleware (using sagas instead)
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    example: exampleReducer,
    users: usersReducer,
    adminAuth: adminAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Initialize saga middleware with root saga
sagaMiddleware.run(rootSaga);

// Export TypeScript types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
