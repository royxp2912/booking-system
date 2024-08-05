import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./slices/room.slice";
import userReducer from "./slices/user.slice";
import hotelReducer from "./slices/hotel.slice";
import bookingReducer from "./slices/booking.slice";

export const store = configureStore({
    reducer: {
        hotel: hotelReducer,
        room: roomReducer,
        booking: bookingReducer,
        user: userReducer,
    }
})