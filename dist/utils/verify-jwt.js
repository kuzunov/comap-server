"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require("jsonwebtoken");
const utils_1 = require("./utils");
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    const bearer = (bearerHeader) ? bearerHeader.split(' ') : [];
    const token = (bearer.length > 1) ? bearer[1] : undefined;
    if (!token) {
        return (0, utils_1.sendErrorResponse)(req, res, 403, 'No token provided.');
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next({ status: 401, message: `Unauthorized. ${err.toString()}`, error: err });
        }
        req.userId = decoded.id;
        next();
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verify-jwt.js.map