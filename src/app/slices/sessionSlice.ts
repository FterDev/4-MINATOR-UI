import { createSlice } from "@reduxjs/toolkit";


interface SessionState {
    token: string | null;
    nickname: string | null;
    email: string | null;
    picture: string | null;
}


const initialState: SessionState = {
    token: null,
    nickname: null,
    email: null,
    picture: null
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSession(state, action) {
            state.token = action.payload.token;
            state.nickname = action.payload.nickname;
            state.email = action.payload.email;
            state.picture = action.payload.picture;

        },
        clearSession(state) {
            state.token = null;
            state.nickname = null;
            state.email = null;
            state.picture = null;
        }
    }
});


export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;