import { configureStore, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer, { RootState } from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    logger,
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'user/setCurrentUser',
          'products/fetchProducts/fulfilled',
          'products/fetchProducts/pending',
          'products/delete/fulfilled',
          'products/delete/pending',
        ],
        ignoredActionPaths: [
          'user.currentUser.createdAt',
          'user.currentUser.createdAt.seconds',
          'user.currentUser.createdAt.nanoseconds',
        ],
      },
    }),
  ],
  devTools: process.env.NODE_ENV === 'development',
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
