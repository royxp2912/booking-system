import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import verifyAdmin from "../middlewares/verifyAdmin.middleware.js";
import { deleteUserById, getUserById, updatePasswordUserById, updateUser } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/:userID", getUserById);

router.put("/", verifyToken, updateUser);
router.patch("/updatePass", verifyToken, updatePasswordUserById);

router.delete("/:userID", verifyToken, verifyAdmin, deleteUserById);

export default router