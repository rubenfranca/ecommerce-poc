import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth, handleUserProfile, GoogleProvider } from '../../firebase/utils';
import { User as UserFirebase } from '../../types/User';
import { AppDispatch, AppThunk } from '../store';

export interface UserState {
  currentUser: UserFirebase | null;
  signInSuccess: boolean;
  signUpSuccess: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordError: string[];
}

const initialState: UserState = {
  currentUser: null,
  signInSuccess: false,
  signUpSuccess: false,
  resetPasswordSuccess: false,
  resetPasswordError: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<UserFirebase>) => {
      state.currentUser = payload;
    },
    signInSuccess: (state, { payload }: { payload: boolean }) => {
      state.signInSuccess = payload;
    },
    signUpSuccess: (state, { payload }: { payload: boolean }) => {
      state.signUpSuccess = payload;
    },
    resetPasswordSuccess: (state, { payload }: { payload: boolean }) => {
      state.resetPasswordSuccess = payload;
    },
    resetPasswordError: (state, { payload }: { payload: string[] }) => {
      state.resetPasswordError = payload;
    },
    clearResetPasswordError: (state) => {
      state.resetPasswordError = [];
    },
    resetAuthForms: (state) => {
      state.resetPasswordError = initialState.resetPasswordError;
      state.resetPasswordSuccess = initialState.resetPasswordSuccess;
      state.signInSuccess = initialState.signInSuccess;
      state.signUpSuccess = initialState.signUpSuccess;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const {
  setCurrentUser,
  signInSuccess,
  signUpSuccess,
  clearResetPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  resetAuthForms,
  logout,
} = userSlice.actions;

export const signInUser = (email: string, password: string): AppThunk => async (
  dispatch: AppDispatch,
) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);

    dispatch(signInSuccess(true));
  } catch (err) {
    console.log(err);
  }
};

export const signUpUser = (
  displayName: string,
  email: string,
  password: string,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await handleUserProfile(user, { displayName });
    dispatch(signUpSuccess(true));
  } catch (e) {
    console.log(e);
  }
};

export const resetPassword = (email: string) => async (
  dispatch: AppDispatch,
) => {
  dispatch(clearResetPasswordError());
  try {
    await auth.sendPasswordResetEmail(email, {
      url: 'http://localhost:3000/login',
    });

    dispatch(resetPasswordSuccess(true));
  } catch (err) {
    dispatch(resetPasswordError(['Email not found, please try again']));
  }
};

export const signInWithGoogle = () => async (dispatch: AppDispatch) => {
  try {
    await auth.signInWithPopup(GoogleProvider);

    dispatch(signInSuccess(true));
  } catch (err) {
    console.log(err);
  }
};

export const signOutUser = () => async (dispatch: AppDispatch) => {
  try {
    await auth.signOut();

    dispatch(logout());
  } catch (err) {
    console.log(err);
  }
};

export default userSlice.reducer;
