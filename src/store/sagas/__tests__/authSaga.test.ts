import { runSaga } from 'redux-saga';
import { loginSaga, registerSaga } from '../authSaga';
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
} from '../../slices/authSlice';

describe('Auth Sagas', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loginSaga', () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should handle successful login', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ user: { id: 1 }, token: 'test-token' }),
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const dispatched: any[] = [];
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({}),
        },
        // @ts-ignore - ignore generator function type error for testing
        loginSaga,
        { type: 'auth/loginRequest', payload: loginData }
      ).toPromise();

      expect(dispatched).toEqual([
        loginSuccess({ user: { id: 1 }, token: 'test-token' }),
      ]);
    });

    it('should handle login failure', async () => {
      const errorMessage = 'Invalid credentials';
      const mockResponse = {
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const dispatched: any[] = [];
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({}),
        },
        // @ts-ignore - ignore generator function type error for testing
        loginSaga,
        { type: 'auth/loginRequest', payload: loginData }
      ).toPromise();

      expect(dispatched).toEqual([loginFailure(errorMessage)]);
    });
  });

  describe('registerSaga', () => {
    const registerData = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      confirmPassword: 'password123'
    };

    it('should handle successful registration', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ user: { id: 1 }, token: 'test-token' }),
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const dispatched: any[] = [];
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({}),
        },
        // @ts-ignore - ignore generator function type error for testing
        registerSaga,
        { type: 'auth/registerRequest', payload: registerData }
      ).toPromise();

      expect(dispatched).toEqual([
        registerSuccess({ user: { id: 1 }, token: 'test-token' }),
      ]);
    });

    it('should handle registration failure', async () => {
      const errorMessage = 'Email already exists';
      const mockResponse = {
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const dispatched: any[] = [];
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({}),
        },
        // @ts-ignore - ignore generator function type error for testing
        registerSaga,
        { type: 'auth/registerRequest', payload: registerData }
      ).toPromise();

      expect(dispatched).toEqual([registerFailure(errorMessage)]);
    });
  });
});
