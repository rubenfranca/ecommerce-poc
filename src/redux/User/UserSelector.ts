import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export const getUser = createSelector(
  (state: RootState) => state.user.currentUser,
  (user) => user,
);
