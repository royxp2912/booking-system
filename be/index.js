import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import roomRoute from "./routes/rooms.route.js";
import userRoute from "./routes/users.route.js";
import authRoute from "./routes/auths.route.js";
import hotelRoute from "./routes/hotels.route.js";
import bookingRoute from "./routes/bookings.route.js";

// connect to mongodb
import mongoDB from "./connections/mongodb.js";

const app = express();
dotenv.config();

// middleware
app.use(cookieParser());
app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: true,
    }),
);

app.options('*', cors({ credentials: true, origin: true }));

// Route API
app.use("/users", userRoute);
app.use("/rooms", roomRoute);
app.use("/auths", authRoute);
app.use("/hotels", hotelRoute);
app.use("/bookings", bookingRoute);


// middleware handel error
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!!";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(process.env.PORT, () => {
    mongoDB();
    console.log("Connect to backend done!");
});

