import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./slice/userDataSlice";

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
