import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/createError.js";

export const getRoomAvaiByHolId = async (req, res, next) => {
    try {
        const geted = await Room.find({ hotel: req.params.holID, isAvailable: true })
            .populate({ path: 'hotel', select: 'name' })
            .select("-createdAt -updatedAt -__v");
        const existHoteel = await Hotel.findById(req.params.holID);
        if (!existHoteel) return next(createError(404, "Hotel chưa tồn tại!"));

        res.status(201).json({
            success: true,
            message: "Lấy thông tin Room của Hotel thành công !",
            total: geted.length,
            data: geted,
        })
    } catch (err) {
        next(err);
    }
}

export const getRoomById = async (req, res, next) => {
    try {
        const geted = await Room.findById(req.params.roomID)
            .populate({ path: 'hotel', select: 'name location city' })
            .select("-createdAt -updatedAt -__v");
        if (!geted) return next(createError(404, "Room chưa tồn tại!"));

        res.status(201).json({
            success: true,
            message: "Lấy thông tin Room thành công !",
            data: geted,
        })
    } catch (err) {
        next(err);
    }
}

export const getAllRoom = async (req, res, next) => {
    try {
        const geted = await Room.find()
            .populate({ path: 'hotel', select: 'name' })
            .limit(4)
            .select("-createdAt -updatedAt -__v")
            .sort({ createdAt: 1 });

        res.status(201).json({
            success: true,
            message: "Lấy thông tin tất cả Room thành công !",
            total: geted.length,
            data: geted,
        })
    } catch (err) {
        next(err);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updated = await Room.findByIdAndUpdate(
            req.params.roomID,
            { $set: req.body },
            { new: true },
        ).select("-createdAt -updatedAt -__v");
        if (!updated) return next(createError(404, "Room chưa tồn tại!"));

        res.status(201).json({
            success: true,
            message: "Cập nhật Room thành công !",
        })
    } catch (err) {
        next(err);
    }
}

export const createRoom = async (req, res, next) => {
    try {
        const existHotel = await Hotel.findById(req.body.hotel);
        if (!existHotel) return next(createError(404, "Hotel chưa tồn tại!"));

        const existRoom = await Room.findOne({ name: req.body.name, hotel: req.body.hotel });
        if (existRoom) return next(createError(404, "Hotel này đã có Room tên này rồi!"));

        const newRoom = new Room({
            name: req.body.name,
            type: req.body.type,
            desc: req.body.desc,
            price: req.body.price,
            hotel: req.body.hotel,
            images: req.body.images,
            maxPeopel: req.body.maxPeopel,
        });
        await newRoom.save();

        await Hotel.findByIdAndUpdate(
            req.body.hotel,
            { $inc: { totalRoomAvai: 1 } },
        )

        res.status(201).json({
            success: true,
            message: "Tạo mới Room thành công !",
        })
    } catch (err) {
        next(err);
    }
}

export const deleteRoomById = async (req, res, next) => {
    try {
        const deleted = await Room.findByIdAndDelete(req.params.roomID);
        if (!deleted) return next(createError(404, "Room chưa tồn tại!"));

        res.status(201).json({
            success: true,
            message: "Xóa Room thành công !",
        })
    } catch (err) {
        next(err);
    }
}

export const deleteAllRoom = async (req, res, next) => {
    try {
        await Room.deleteMany();

        res.status(201).json({
            success: true,
            message: "Xóa tất cả Room thành công !",
        })
    } catch (err) {
        next(err);
    }
}