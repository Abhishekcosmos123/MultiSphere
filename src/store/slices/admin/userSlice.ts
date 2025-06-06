import { CreatedUserResponse, CreateUserPayload, UpdateUser, UpdateUserPayload } from '@/lib/api/services/authService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    country_code: string | null;
    provider: string;
    role: string;
    created_by: string | null;
    updated_by: string | null;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_deleted: boolean;
    profile_pic: string | null;
}

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
    updatedUser: UpdateUser | null;
    createdUser: CreatedUserResponse | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    updatedUser: null,
    createdUser: null,
};

interface SearchPayload {
    searchBy: string;
    searchValue: string;
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        searchUsersRequest(state, action: PayloadAction<SearchPayload>) {
            state.loading = true;
            state.error = null;
        },
        searchUsersSuccess(state, action: PayloadAction<{ success: boolean; message: string; data: { users: User[] } }>) {
            state.loading = false;
            state.users = action.payload.data.users;
        },
        searchUsersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserRequest(state, action: PayloadAction<string>) {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        deleteUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserRequest(state, action: PayloadAction<UpdateUserPayload>) {
            state.loading = true;
            state.error = null;
            state.updatedUser = null;
        },
        updateUserSuccess(state, action: PayloadAction<UpdateUser>) {
            state.loading = false;
            state.updatedUser = action.payload;
        },
        updateUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        resetUpdateStatus(state) {
            state.loading = false;
            state.error = null;
            state.updatedUser = null;
        },
        createUserRequest(state, _action: PayloadAction<CreateUserPayload>) {
            state.loading = true;
            state.error = null;
        },
        createUserSuccess(state, action: PayloadAction<CreatedUserResponse>) {
            state.loading = false;
            state.createdUser = action.payload;
        },
        createUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { searchUsersRequest, searchUsersSuccess, searchUsersFailure, deleteUserRequest, deleteUserSuccess, deleteUserFailure, updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
    resetUpdateStatus, createUserRequest, createUserSuccess, createUserFailure } = userSlice.actions;
export default userSlice.reducer;
