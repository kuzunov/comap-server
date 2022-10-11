"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJsonToFile = exports.getJsonFromFile = exports.replace_id = exports.sendErrorResponse = void 0;
const fs_1 = require("fs");
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
const replace_id = function (entity) {
    entity.id = entity._id;
    delete entity._id;
    return entity;
};
exports.replace_id = replace_id;
const getJsonFromFile = (dbFile) => __awaiter(void 0, void 0, void 0, function* () {
    const fileData = yield fs_1.promises.readFile(dbFile);
    const JSONentity = JSON.parse(fileData.toString());
    return JSONentity;
});
exports.getJsonFromFile = getJsonFromFile;
const writeJsonToFile = (dbFile, entity) => __awaiter(void 0, void 0, void 0, function* () {
    fs_1.promises.writeFile(dbFile, JSON.stringify(entity));
});
exports.writeJsonToFile = writeJsonToFile;
//# sourceMappingURL=utils.js.map