import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        session: null
    },
    reducers: {
        setSession: (state, action) => {
            state.session = action.payload;
        },

        logOut: (state, action) => {
            state.session = null;
        }
    }
});

export const { logOut, setSession } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentSession = state => state.auth.session;
