import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/createError.js";

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true
        })
            .status(200).send({
                success: true,
                message: "Đăng xuất thành công!",
            });
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const existUser = await User.findOne({ username: req.body.username })
            .select("-createdAt -updatedAt -__v");
        if (!existUser) return next(createError(400, "Người dùng chưa tồn tại!"));

        const isMatch = bcrypt.compareSync(req.body.password, existUser.password);
        if (!isMatch) return next(createError(403, "Sai mật khẩu!"))
        if (existUser.isLocked) return next(createError(403, "Người dùng đã bị khóa tài khoản!"))

        const token = jwt.sign({ id: existUser._id, isAdmin: existUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: "24h" });
        const { password, isAdmin, isLocked, ...others } = existUser._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        })
            .status(200).json({
                success: true,
                message: "Đăng nhập thành công!",
                data: others,
            });
    } catch (err) {
        next(err);
    }
}

export const register = async (req, res, next) => {
    try {
        const existUsername = await User.findOne({ username: req.body.username });
        const existEmail = await User.findOne({ email: req.body.email });
        if (existUsername || existEmail) return next(createError(400, "Người dùng đã tồn tại!"));

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;

        const newUser = new User(req.body);
        const saved = await newUser.save();

        if (!saved) return next(createError(400, "Đăng ký thất bại!"))

        res.status(201).json({
            success: true,
            message: "Đăng ký thành công!",
        })
    } catch (err) {
        next(err);
    }
}