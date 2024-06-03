import { createSlice } from "@reduxjs/toolkit";
import { set } from "firebase/database";


interface SessionState {
    userId: string | null;
    token: string | null;
    nickname: string | null;
    email: string | null;
    picture: string | null;
    matchId: any | null;
}


const initialState: SessionState = {
    userId: null,
    token: null,
    nickname: null,
    email: null,
    picture: null,
    matchId: null
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSession(state, action) {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.nickname = action.payload.nickname;
            state.email = action.payload.email;
            state.picture = action.payload.picture;
        },
        clearSession(state) {
            state.userId = null;
            state.token = null;
            state.nickname = null;
            state.email = null;
            state.picture = null;
        },
        setNickname(state, action) {
            state.nickname = action.payload;
        },
        setMatchId(state, action) {
            state.matchId = action.payload;
        }
    }
});


export const { setSession, clearSession, setNickname, setMatchId } = sessionSlice.actions;
export default sessionSlice.reducer;