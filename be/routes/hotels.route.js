import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import verifyAdmin from "../middlewares/verifyAdmin.middleware.js";
import {
    createHotel,
    getAllHotel,
    updateHotel,
    getHotelById,
    createUpHotel,
    deleteAllHotel,
    deleteHotelById,
    getHotelByKeyword,
} from "../controllers/hotels.controller.js";
import uploadCloud from "../middlewares/multerCloudinary.js";

const router = express.Router();

router.post("/", verifyToken, verifyAdmin, createHotel);

router.put("/:holID", verifyToken, verifyAdmin, updateHotel);

router.get("/", getAllHotel);
router.get("/:holID", getHotelById);
router.get("/search/keyword", getHotelByKeyword);

router.delete("/", verifyToken, verifyAdmin, deleteAllHotel);
router.delete("/:holID", verifyToken, verifyAdmin, deleteHotelById);

export default router