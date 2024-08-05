import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "User chưa được xác thực!"));
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.id = decoded.id;
        req.body.isAdmin = decoded.isAdmin;
        next();
    } catch (err) {
        next(createError(403, "Access Token không chính xác !"));
    }
}

export default verifyToken