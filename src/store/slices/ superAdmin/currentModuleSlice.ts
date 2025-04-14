import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CurrentModuleState {
  loading: boolean
  currentModule: string | null
  error: string | null
}

const initialState: CurrentModuleState = {
  loading: false,
  currentModule: null,
  error: null,
}

const currentModuleSlice = createSlice({
  name: "currentModule",
  initialState,
  reducers: {
    fetchCurrentModuleRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchCurrentModuleSuccess(state, action: PayloadAction<string>) {
      state.loading = false
      state.currentModule = action.payload
    },
    fetchCurrentModuleFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchCurrentModuleRequest,
  fetchCurrentModuleSuccess,
  fetchCurrentModuleFailure,
} = currentModuleSlice.actions

export default currentModuleSlice.reducer
