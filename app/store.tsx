import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./states/userDataSlice";



export default configureStore({
    reducer: {
        userData: userDataReducer
    }
});