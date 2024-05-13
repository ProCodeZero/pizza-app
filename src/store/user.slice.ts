import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { LoginResponce } from "../interfaces/auth.interface";
import { PREFIX } from "../helpers/API";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
}

const initialState: UserState = {
  // Загружаем токен из LocalStorage
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponce>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
  },
  extraReducers: (buider) => {
    buider.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    buider.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
