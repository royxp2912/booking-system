import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import verifyAdmin from "../middlewares/verifyAdmin.middleware.js";
import {
    createRoom,
    deleteAllRoom,
    deleteRoomById,
    getAllRoom,
    getRoomById,
    updateRoom,
    getRoomAvaiByHolId,
} from "../controllers/rooms.controller.js";

const router = express.Router();

router.get("/", getAllRoom);
router.get("/:roomID", getRoomById);
router.get("/hotel/:holID", getRoomAvaiByHolId);

router.post("/", verifyToken, verifyAdmin, createRoom);

router.put("/:roomID", verifyToken, verifyAdmin, updateRoom);

router.delete("/", verifyToken, verifyAdmin, deleteAllRoom);
router.delete("/:roomID", verifyToken, verifyAdmin, deleteRoomById);

export default router