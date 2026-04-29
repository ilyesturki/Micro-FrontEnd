import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getUser,
  updateUser,
  updateUserPassword,
  deleteUser,
} from "./userThunk";

export interface UserType {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  image?: string;
  status: "active" | "inactive";
}

export type UserTypeWithoutId = Omit<UserType, "id">;

interface UsersState {
  user: UserType | null;
  loading: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
  error: string | null;
}

const initialState: UsersState = {
  user: null,
  loading: false,
  updateSuccess: false,
  deleteSuccess: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.loading = false;
          state.updateSuccess = true;
          state.user = action.payload;
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.updateSuccess = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(
        updateUserPassword.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.loading = false;
          state.updateSuccess = true;
          state.user = action.payload;
        }
      )
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.updateSuccess = false;
        state.error = action.error.message as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.deleteSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.deleteSuccess = false;
        state.error = action.error.message as string;
      });
  },
});

export default usersSlice.reducer;
