import newAxios from "../../hooks/newAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ACTION
export const getUserById = createAsyncThunk("user/getUserById",
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await newAxios.get(`/users/${userId}`);
            return data;
        } catch (err) {
            rejectWithValue(err);
        }
    });

export const updateUserById = createAsyncThunk("user/updateUserById",
    async (info, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await newAxios.put(`/users`, info);
            await dispatch(getUserById(info.userID));
            return data;
        } catch (err) {
            rejectWithValue(err);
        }
    });

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        detail: {},
        error: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getUserById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.detail = action.payload.data;
        });
        builder.addCase(getUserById.rejected, (state, action) => {
            console.log("Err: ", action.payload);
            state.loading = false;
            state.error = true;
        });
        builder.addCase(updateUserById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateUserById.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateUserById.rejected, (state, action) => {
            console.log("Err: ", action.payload);
            state.loading = false;
            state.error = true;
        });
    },
});

export default userSlice.reducer;