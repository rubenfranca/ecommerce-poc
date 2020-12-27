import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '../store';

export interface ProductsState {}

const initialState: ProductsState = {};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
