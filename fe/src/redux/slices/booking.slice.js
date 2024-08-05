import newAxios from "../../hooks/newAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ACTION
export const getAllBookingByUserId = createAsyncThunk("booking/getAllBookingByUserId",
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await newAxios.get(`/bookings/user/${userId}`);
            return data;
        } catch (err) {
            rejectWithValue(err);
        }
    })

export const createBooking = createAsyncThunk("booking/craeteBooking", async (booking, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await newAxios.post(`/bookings`, booking);
        await dispatch(getAllBookingByUserId(booking.user));
        return data;
    } catch (err) {
        rejectWithValue(err);
    }
})

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        loading: false,
        data: [],
        detail: {},
        error: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBookingByUserId.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllBookingByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        });
        builder.addCase(getAllBookingByUserId.rejected, (state, action) => {
            console.log("Err: ", action.payload);
            state.loading = false;
            state.error = true;
        });
        builder.addCase(createBooking.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createBooking.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createBooking.rejected, (state, action) => {
            console.log("Err: ", action.payload);
            state.loading = false;
            state.error = true;
        });
    },
});

export default bookingSlice.reducer;