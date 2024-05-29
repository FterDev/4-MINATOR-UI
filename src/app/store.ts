import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./slices/sessionSlice";




export const rootRedux = configureStore({
    reducer: {
        session: sessionReducer
    }
});


export default rootRedux;