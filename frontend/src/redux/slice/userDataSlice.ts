import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserDataState {
  username: string;
  userType: string;
}

const initialState: UserDataState = {
  username: "",
  userType: "",
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{ username: string; userType: string }>
    ) => {
      state.username = action.payload.username;
      state.userType = action.payload.userType;
    },
  },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
