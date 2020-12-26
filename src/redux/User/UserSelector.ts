import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export const getUser = createSelector(
  (state: RootState) => state.user.currentUser,
  (user) => user,
);

export const getSignInSuccess = createSelector(
  (state: RootState) => state.user.signInSuccess,
  (signInSuccess: boolean) => signInSuccess,
);

export const getSignUpSuccess = createSelector(
  (state: RootState) => state.user.signUpSuccess,
  (signUpSuccess: boolean) => signUpSuccess,
);

export const getResetPasswordSuccess = createSelector(
  (state: RootState) => state.user.resetPasswordSuccess,
  (resetPasswordSuccess: boolean) => resetPasswordSuccess,
);

export const getResetPasswordErrors = createSelector(
  (state: RootState) => state.user.resetPasswordError,
  (resetPasswordError: string[]) => resetPasswordError,
);
