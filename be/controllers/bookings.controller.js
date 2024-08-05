import Room from "../models/Room.js";
import User from "../models/User.js";
import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";
import { createError } from "../utils/createError.js";

export const getBookingByUserId = async (req, res, next) => {
    try {
        const geted = await Booking.find({ user: req.params.userID })
            .populate({ path: 'room', select: 'name images type price' })
            .populate({ path: 'hotel', select: 'name city location' })
            .populate({ path: 'user', select: 'fullName' })
            .select("-createdAt -updatedAt -__v");
        if (geted.length === 0) return next(createError(404, "User chưa có Booking nào!"));

        res.status(201).json({
            success: true,
            message: "Lấy thông tin Booking của User thành công !",
            total: geted.length,
            data: geted,
        })
    } catch (err) {
        next(err);
    }
}

export const getBookingByHolId = async (req, res, next) => {
    try {
        const geted = await Booking.find({ hotel: req.params.holID })
            .populate({ path: 'room', select: 'name images type price' })
            .populate({ path: 'hotel', select: 'name city location' })
            .populate({ path: 'user', select: 'fullName' })
            .select("-createdAt -updatedAt -__v");
        if (geted.length === 0) return next(createError(404, "Hotel chưa có Booking nào!"));

        res.status(201).json({
            success: true,
            message: "Lấy thông tin Booking của Hotel thành công !",
            total: geted.length,
            data: geted,
        })
    } catch (err) {
        next(err);
    }
}

export const getBookingById = async (req, res, next) => {
    try {
        const geted = await Booking.findById(req.params.bookID)
            .populate({ path: 'room', select: 'name images type price' })
            .populate({ path: 'hotel', select: 'name city location' })
            .populate({ path: 'user', select: 'fullName' })
            .select("-createdAt -updatedAt -__v");
        if (!geted) return next(createError(404, "Booking chưa tồn tại!"));

        res.status(201).json({
            success: true,
            message: "Lấy thông tin Booking thành công !",
            data: geted,
        })
    } catch (err) {
        next(err);
    }
}

export const getAllBooking = async (req, res, next) => {
    try {
        const geted = await Booking.find()
            .populate({ path: 'room', select: 'name images type price' })
            .populate({ path: 'hotel', select: 'name city location' })
            .populate({ path: 'user', select: 'fullName' })
            .select("-createdAt -updatedAt -__v");

        res.status(201).json({
            success: true,
            message: "Lấy thông tin tất cả Booking thành công !",
            total: geted.length,
            data: geted,
        })
    } catch (err) {
        next(err);
    }
}

export const updateBooking = async (req, res, next) => {
    try {
        const updated = await Booking.findByIdAndUpdate(
            req.params.bookID,
            { $set: req.body },
        );
        if (!updated) return next(createError(404, "Booking chưa tồn tại!"));

        res.status(201).json({
            success: true,
            message: "Cập nhật Booking thành công !",
        })
    } catch (err) {
        next(err);
    }
}

export const createBooking = async (req, res, next) => {
    try {
        const existUser = await User.findById(req.body.user);
        if (!existUser) return next(createError(404, "User chưa tồn tại!"));

        const existHotel = await Hotel.findById(req.body.hotel);
        if (!existHotel) return next(createError(404, "Hotel chưa tồn tại!"));

        const existRoom = await Room.findById(req.body.room);
        if (!existRoom) return next(createError(404, "Room chưa tồn tại!"));

        const exist = await Room.findOne({ name: existRoom.name, hotel: req.body.hotel });
        if (!exist) return next(createError(404, "Hotel không tồn tại Room này!"));

        const newBooking = new Booking({
            user: req.body.user,
            hotel: req.body.hotel,
            room: req.body.room,
            from: req.body.from,
            to: req.body.to,
        });
        await newBooking.save();

        await Room.findByIdAndUpdate(
            req.body.room,
            { $set: { isAvailable: false } },
        )

        res.status(201).json({
            success: true,
            message: "Tạo mới Booking thành công !",
        })
    } catch (err) {
        next(err);
    }
}

export const deleteBookingById = async (req, res, next) => {
    try {
        const deleted = await Booking.findByIdAndDelete(req.params.bookID);
        if (!deleted) return next(createError(404, "Booking chưa tồn tại!"));

        res.status(201).json({
            success: true,
            message: "Xóa Booking thành công !",
        })
    } catch (err) {
        next(err);
    }
}

export const deleteAllBooking = async (req, res, next) => {
    try {
        await Booking.deleteMany();

        res.status(201).json({
            success: true,
            message: "Xóa tất cả Booking thành công !",
        })
    } catch (err) {
        next(err);
    }
}