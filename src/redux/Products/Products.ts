import { auth } from '../../firebase/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '../store';
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
} from './Products.helper';

interface ProductPayload {
  productCategory: string;
  productName: string;
  productThumbnail: string;
  productPrice: number;
}

export interface Products extends ProductPayload {
  productAdminUserUID?: string;
  createdDate: Date;
}

export interface ProductsResponse extends Products {
  documentID: string;
}

export interface ProductsState {
  products: ProductsResponse[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, { payload }: { payload: ProductsResponse[] }) => {
      state.products = payload;
    },
  },
  extraReducers: {
    'products/fetchProducts/fulfilled': (
      state,
      { payload }: { payload: ProductsResponse[] },
    ) => {
      state.products = payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: ProductPayload, thunkApi) => {
    const timestamp = new Date();
    try {
      handleAddProduct({
        ...product,
        productAdminUserUID: auth.currentUser?.uid,
        createdDate: timestamp,
      });

      thunkApi.dispatch(fetchProducts());
    } catch (err) {
      console.log(err);
    }
  },
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const products = await handleFetchProducts();

      return products;
    } catch (err) {
      console.log(err);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (documentID: string, thunkApi) => {
    try {
      await handleDeleteProduct(documentID);
      thunkApi.dispatch(fetchProducts());
    } catch (error) {
      console.log(error);
    }
  },
);

export default productsSlice.reducer;
