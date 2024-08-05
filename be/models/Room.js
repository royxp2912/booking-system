import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    type: {
        type: String,
        enum: ["Luxury", "Economy"],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeopel: {
        type: Number,
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
    isAvailable: {
        type: Boolean,
        default: true,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
    }
},
    { timestamps: true }
)

export default mongoose.model("Room", RoomSchema)