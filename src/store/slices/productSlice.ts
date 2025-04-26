import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  loading: boolean;
  error: string | null;
  success: boolean;
  productId: string | null;
}

const initialState: ProductState = {
  loading: false,
  error: null,
  success: false,
  productId: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Modify createProductRequest to accept a payload of type FormData
    createProductRequest: (state, action: PayloadAction<FormData>) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.productId = null;
      // Here you can potentially handle the FormData or pass it to a thunk/saga for the API call
    },
    createProductSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = true;
      state.productId = action.payload;
    },
    createProductFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetProductState: () => initialState,
  },
});

export const {
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;
