import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './User/User';
import productsReducer from './Products/Products';

const rootReducer = combineReducers({
  user: userReducer,
  productsData: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
