import Hotel from "../models/Hotel.js";
import { createError } from "../utils/createError.js";

export const getHotelByKeyword = async (req, res, next) => {
    try {
        const keyword = req.query.keyword;
        const geted = await Hotel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { desc: { $regex: keyword, $options: 'i' } },
                { type: { $regex: keyword, $options: 'i' } },
                { city: { $regex: keyword, $options: 'i' } },
                { location: { $regex: keyword, $options: 'i' } },
            ],
        })
            .select("-createdAt -updatedAt -__v");

        res.status(201).json({
            success: true,
            message: "Lấy thông tin Hotel thành công !",
            total: geted.length,
            data: geted,
        })
    } catch (err) {
        next(err);
    }
}

export const getHotelById = async (req, res, next) => {
    try {
        const geted = await Hotel.findById(req.params.holID).select("-createdAt -updatedAt -__v");
        if (!geted) return next(createError(404, "Hotel chưa tồn tại!"));

        res.status(201).json({
            success: true,
            message: "Lấy thông tin Hotel thành công !",
            data: geted,
        })
    } catch (err) {
        next(err);
    }
}

export const getAllHotel = async (req, res, next) => {
    try {
        const geted = await Hotel.find().select("-createdAt -updatedAt -__v");

        res.status(201).json({
            success: true,
            message: "Lấy thông tin tất cả Hotel thành công !",
            total: geted.length,
            data: geted,
        })
    } catch (err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updated = await Hotel.findByIdAndUpdate(
            req.params.holID,
            { $set: req.body },
            { new: true },
        ).select("-createdAt -updatedAt -__v");
        if (!updated) return next(createError(404, "Hotel chưa tồn tại!"));

        res.status(201).json({
            success: true,
            message: "Cập nhật Hotel thành công !",
        })
    } catch (err) {
        next(err);
    }
}

export const createHotel = async (req, res, next) => {
    try {
        const exist = await Hotel.findOne({ name: req.body.name });
        if (exist) return next(createError(404, "Hotel đã tồn tại!"));
        const newHotel = new Hotel({
            name: req.body.name,
            image: req.body.image,
            type: req.body.type,
            city: req.body.city,
            location: req.body.location,
            desc: req.body.desc,
        });
        const saved = await newHotel.save();
        res.status(201).json({
            success: true,
            message: "Tạo mới Hotel thành công !",
        })
    } catch (err) {
        next(err);
    }
}

export const deleteHotelById = async (req, res, next) => {
    try {
        const deleted = await Hotel.findByIdAndDelete(req.params.holID);
        if (!deleted) return next(createError(404, "Hotel chưa tồn tại!"));

        res.status(201).json({
            success: true,
            message: "Xóa Hotel thành công !",
        })
    } catch (err) {
        next(err);
    }
}

export const deleteAllHotel = async (req, res, next) => {
    try {
        await Hotel.deleteMany();

        res.status(201).json({
            success: true,
            message: "Xóa tất cả Hotel thành công !",
        })
    } catch (err) {
        next(err);
    }
}

export const createUpHotel = async (req, res, next) => {
    console.log(req.body);
    let image;
    if (req.file) image = req.file.path;
    try {
        const exist = await Hotel.findOne({ name: req.body.name });
        if (exist) next(createError(404, "Hotel đã tồn tại!"));
        req.body.image = image;
        const newHotel = new Hotel(req.body);
        const saved = await newHotel.save();

        res.status(201).json({
            success: true,
            message: "Tạo mới Hotel thành công !",
        })
    } catch (err) {
        next(err);
    }
}