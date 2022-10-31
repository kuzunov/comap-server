"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.NotFoundError = exports.InvalidDataError = exports.AuthenticationError = exports.AppError = void 0;
class AppError extends Error {
    constructor(status, message, error) {
        super(message);
        this.status = status;
        this.error = error;
    }
}
exports.AppError = AppError;
class AuthenticationError extends Error {
}
exports.AuthenticationError = AuthenticationError;
class InvalidDataError extends Error {
}
exports.InvalidDataError = InvalidDataError;
class NotFoundError extends Error {
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends Error {
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=errors.js.map