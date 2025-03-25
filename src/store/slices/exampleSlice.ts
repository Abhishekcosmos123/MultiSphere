import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleData {
  id: number;
  title: string;
  description: string;
}

interface ExampleState {
  data: ExampleData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ExampleState = {
  data: null,
  loading: false,
  error: null,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    fetchDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<ExampleData>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = exampleSlice.actions;
export default exampleSlice.reducer; 