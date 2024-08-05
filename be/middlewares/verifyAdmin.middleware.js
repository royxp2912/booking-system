import { createError } from "../utils/createError.js";

const verifyAdmin = async (req, res, next) => {
    try {
        if (!req.body.isAdmin) next(createError(403, "Không được ủy quyền! Người dùng không phải là Admin!"));
        next();
    } catch (error) {
        next(createError(403, "Truy cập thất bại!"));
    }
}

export default verifyAdmin