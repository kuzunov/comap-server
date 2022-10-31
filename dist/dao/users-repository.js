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
exports.UsersRepositoryImpl = void 0;
const errors_1 = require("../model/errors");
const utils_1 = require("../utils/utils");
const repository_1 = require("./repository");
class UsersRepositoryImpl extends repository_1.RepositoryImpl {
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.db.collection(this.collection).findOne({ username });
                if (!user) {
                    throw new errors_1.NotFoundError(`User with ${username} does not exist.`);
                }
                return (0, utils_1.replace_IdWithId)(user);
            }
            catch (err) {
                throw new errors_1.AppError(500, `Error in DB`);
            }
        });
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            delete entity.id;
            entity.created = Date.now();
            entity.modified = Date.now();
            const document = entity;
            const userNameExists = yield this.findByUsername(entity.username);
            if (!userNameExists) {
                const { acknowledged, insertedId } = yield this.db.collection(this.collection).insertOne(document);
                if (acknowledged) {
                    console.log(`Successfully inserted 1 document with ID ${insertedId}`);
                }
                return (0, utils_1.replace_IdWithId)(document);
            }
            else {
                throw new errors_1.AppError(409, 'Username already exists');
            }
        });
    }
}
exports.UsersRepositoryImpl = UsersRepositoryImpl;
//# sourceMappingURL=users-repository.js.map