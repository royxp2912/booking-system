import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import verifyAdmin from "../middlewares/verifyAdmin.middleware.js";
import {
    createBooking,
    getAllBooking,
    updateBooking,
    getBookingById,
    deleteAllBooking,
    deleteBookingById,
    getBookingByHolId,
    getBookingByUserId,
} from "../controllers/bookings.controller.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllBooking);
router.get("/:bookID", verifyToken, getBookingById);
router.get("/hotel/:holID", verifyToken, verifyAdmin, getBookingByHolId);
router.get("/user/:userID", verifyToken, getBookingByUserId);

router.post("/", verifyToken, createBooking);

router.put("/:bookID", updateBooking);

router.delete("/", verifyToken, verifyAdmin, deleteAllBooking);
router.delete("/:bookID", verifyToken, verifyAdmin, deleteBookingById);

export default router