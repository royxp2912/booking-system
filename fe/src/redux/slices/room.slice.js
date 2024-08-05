import newAxios from "../../hooks/newAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ACTION
export const getAllRooms = createAsyncThunk("room/getAllRooms",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await newAxios.get(`/rooms`);
            return data;
        } catch (err) {
            rejectWithValue(err);
        }
    });

export const getAllRoomsByHoltelId = createAsyncThunk("room/getAllRoomsByHoltelId",
    async (holId, { rejectWithValue }) => {
        try {
            const { data } = await newAxios.get(`/rooms/hotel/${holId}`);
            return data;
        } catch (err) {
            rejectWithValue(err);
        }
    });

export const getRoomById = createAsyncThunk("room/getRoomById",
    async (roomId, { rejectWithValue }) => {
        try {
            const { data } = await newAxios.get(`/rooms/${roomId}`);
            return data;
        } catch (err) {
            rejectWithValue(err);
        }
    })

const roomSlice = createSlice({
    name: "room",
    initialState: {
        loading: false,
        data: [],
        detail: {},
        error: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllRooms.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllRooms.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        });
        builder.addCase(getAllRooms.rejected, (state, action) => {
            console.log("Err: ", action.payload);
            state.loading = false;
            state.error = true;
        });
        builder.addCase(getAllRoomsByHoltelId.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllRoomsByHoltelId.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        });
        builder.addCase(getAllRoomsByHoltelId.rejected, (state, action) => {
            console.log("Err: ", action.payload);
            state.loading = false;
            state.error = true;
        });
        builder.addCase(getRoomById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getRoomById.fulfilled, (state, action) => {
            state.loading = false;
            state.detail = action.payload.data;
        });
        builder.addCase(getRoomById.rejected, (state, action) => {
            console.log("Err: ", action.payload);
            state.loading = false;
            state.error = true;
        });
    },
});

export default roomSlice.reducer;