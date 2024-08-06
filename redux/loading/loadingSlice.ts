import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = !state.loading;
        }
    }
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

export const selectCurrentLoading = state => state.loading.loading;
