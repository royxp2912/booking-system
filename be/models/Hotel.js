import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Luxury", "Economy"],
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    totalRoomAvai: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true }
)

export default mongoose.model("Hotel", HotelSchema)