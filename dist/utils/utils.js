"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceIdWith_id = exports.replace_IdWithId = exports.sendErrorResponse = void 0;
const sendErrorResponse = function (req, res, status = 500, message, err) {
    if (req.get('env') === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    });
};
exports.sendErrorResponse = sendErrorResponse;
function replace_IdWithId(entity) {
    const id = entity._id.toString();
    delete entity._id;
    let result = Object.assign({}, entity);
    result.id = id;
    return result;
}
exports.replace_IdWithId = replace_IdWithId;
function replaceIdWith_id(entity) {
    const id = entity.id;
    delete entity.id;
    entity._id = id;
    return Object.assign({}, entity);
}
exports.replaceIdWith_id = replaceIdWith_id;
//# sourceMappingURL=utils.js.map