import express from "express";
import {
    login,
    logout,
    register,
} from "../controllers/auths.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.delete("/logout", logout);

export default router