import { createSlice } from "@reduxjs/toolkit";


export const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        username: null,
        gravatar: null
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setGravatar: (state, action) => {
            state.gravatar = action.payload;
        }
    }
});