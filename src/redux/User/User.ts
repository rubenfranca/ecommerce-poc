import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User as UserFirebase } from '../../types/User';

export interface UserState {
  currentUser: UserFirebase | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<UserFirebase>) => {
      state.currentUser = payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
