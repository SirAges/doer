import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        admin: false,
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = !state.loading;
        },
        setAdmin: (state, action) => {
            state.admin = !state.admin
        }
    }
});

export const { setLoading, setAdmin } = loadingSlice.actions;

export default loadingSlice.reducer;

export const selectCurrentLoading = state => state.loading.loading;
export const selectCurrentAdmin = state => state.loading.admin;
