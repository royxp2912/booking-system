import newAxios from "../../hooks/newAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ACTION
export const getAllHotels = createAsyncThunk("hotel/getAllHotels", async (_, { rejectWithValue }) => {
    try {
        const { data } = await newAxios.get("/hotels");
        return data;
    } catch (err) {
        rejectWithValue(err);
    }
})

export const getHotelByKeyword = createAsyncThunk("hotel/getHotelByKeyword",
    async (keyword, { rejectWithValue }) => {
        try {
            const { data } = await newAxios.get("/hotels/search/keyword", {
                params: { keyword }
            });
            return data;
        } catch (err) {
            rejectWithValue(err);
        }
    })

export const getHotelById = createAsyncThunk("hotel/getHotelById", async (holId, { rejectWithValue }) => {
    try {
        const { data } = await newAxios.get(`/hotels/${holId}`);
        console.log(data);
        return data;
    } catch (err) {
        rejectWithValue(err);
    }
})

const hotelSlice = createSlice({
    name: "hotel",
    initialState: {
        loading: false,
        data: [],
        detail: {},
        error: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllHotels.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllHotels.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        });
        builder.addCase(getAllHotels.rejected, (state, action) => {
            console.log("Err: ", action.payload);
            state.loading = false;
            state.error = true;
        });
        builder.addCase(getHotelByKeyword.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getHotelByKeyword.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            console.log("state.data: ", state.data);
        });
        builder.addCase(getHotelByKeyword.rejected, (state, action) => {
            console.log("Err: ", action.payload);
            state.loading = false;
            state.error = true;
        });
        builder.addCase(getHotelById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getHotelById.fulfilled, (state, action) => {
            state.loading = false;
            console.log("data: ", action.payload.data);
            state.detail = action.payload.data;
        });
        builder.addCase(getHotelById.rejected, (state, action) => {
            console.log("Err: ", action.payload);
            state.loading = false;
            state.error = true;
        });
    },
});

export default hotelSlice.reducer;