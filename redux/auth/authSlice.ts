import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        session: null,
        admin: false
    },
    reducers: {
        setSession: (state, action) => {
            state.session = action.payload;
        },

        logOut: (state, action) => {
            state.session = false
        },
        setAdmin: (state, action) => {
            state.admin = !state.admin;
        }
    }
});

export const { logOut, setSession, setAdmin } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentSession = state => state.auth.session;
export const selectCurrentAdmin = state => state.auth.admin;
