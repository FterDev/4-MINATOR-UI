import { configureStore } from "@reduxjs/toolkit";
import { userDataSlice } from "./states/userDataSlice";



export default configureStore({
    reducer: {
        userData: userDataSlice.reducer
    }
});