import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createError } from "../utils/createError.js";

export const updatePasswordUserById = async (req, res, next) => {
    try {
        const userID = req.body.userID;
        const newPass = req.body.newPass;
        const oldPass = req.body.oldPass;
        const result = await User.findById(userID);

        if (!result) return next(createError(404, "Người dùng không tồn tại!"));
        const isMatch = bcrypt.compareSync(oldPass, result.password);
        if (!isMatch) return next(createError(404, "Mật khẫu cũ chưa chính xác!"));

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPass, salt);

        await User.findByIdAndUpdate(
            userID,
            { $set: { password: hash } },
        );

        res.status(200).json({
            success: true,
            message: "Cập nhật mật khẩu Người dùng thành công !",
        })
    } catch (err) {
        next(err);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.body.userID,
            {
                $set: {
                    email: req.body.email,
                    phone: req.body.phone,
                    username: req.body.username,
                    fullName: req.body.fullName,
                }
            },
        );

        if (!updated) return next(createError(404, "Người dùng không tồn tại!"));

        res.status(200).json({
            success: true,
            message: "Cập nhật thông tin Người dùng thành công !",
        })
    } catch (err) {
        next(err);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const geted = await User.findById(req.params.userID)
            .select("-createdAt -updatedAt -__v -isAdmin -isLocked -password");

        if (!geted) return next(createError(404, "Người dùng không tồn tại!"));

        res.status(200).json({
            success: true,
            message: "Xóa Người dùng thành công !",
            data: geted,
        })
    } catch (err) {
        next(err);
    }
}

export const deleteUserById = async (req, res, next) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.userID);

        if (!deleted) return next(createError(404, "Người dùng không tồn tại!"));

        res.status(200).json({
            success: true,
            message: "Xóa Người dùng thành công !",
        })
    } catch (err) {
        next(err);
    }
}