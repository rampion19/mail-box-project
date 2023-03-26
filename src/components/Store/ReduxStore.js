import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import mailSlice from "./MailSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    mail: mailSlice.reducer,
  },
});

export default store;