import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export const getProducts = createSelector(
  (state: RootState) => state.productsData.products,
  (products) => products,
);
