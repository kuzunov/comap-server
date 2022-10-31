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
exports.RepositoryImpl = void 0;
const mongodb_1 = require("mongodb");
const utils_1 = require("../utils/utils");
const errors_1 = require("../model/errors");
class RepositoryImpl {
    constructor(db, collection) {
        this.db = db;
        this.collection = collection;
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            delete entity.id;
            entity.created = Date.now();
            entity.modified = Date.now();
            const document = entity;
            const { acknowledged, insertedId } = yield this.db.collection(this.collection).insertOne(document);
            if (acknowledged) {
                console.log(`Successfully inserted 1 document with ID ${insertedId}`);
            }
            return (0, utils_1.replace_IdWithId)(document);
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!entity.id) {
                throw new errors_1.InvalidDataError(`ID cannot be undefined.`);
            }
            const found = yield this.findById(entity.id);
            if (!found) {
                throw new errors_1.NotFoundError(`ID="${entity.id} does not exist and can not be modified.`);
            }
            entity.modified = Date.now();
            (0, utils_1.replaceIdWith_id)(entity);
            var myquery = { _id: new mongodb_1.ObjectId(entity._id) };
            delete entity._id;
            var newvalues = { $set: entity };
            const updateRes = yield this.db.collection(this.collection)
                .updateOne(myquery, newvalues);
            if (updateRes.acknowledged && updateRes.modifiedCount === 1) {
                console.log(`Successfully updated: ${JSON.stringify(entity)}`);
                return entity;
            }
            throw new errors_1.AppError(500, `Error inserting: "${JSON.stringify(entity)}"`);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.findById(id);
            if (!found) {
                throw new errors_1.NotFoundError(`ID="${id} does not exist and can't be modified.`);
            }
            const res = yield this.db.collection(this.collection).deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (res.acknowledged && res.deletedCount === 1) {
                console.log(`Deleted: ${JSON.stringify(found)}`);
                return found;
            }
            throw new errors_1.AppError(500, `Error deleting: "${JSON.stringify(found)}"`);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.db.collection(this.collection).find().toArray();
            return entities.map(result => (0, utils_1.replace_IdWithId)(result));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.db.collection(this.collection).findOne({ _id: new mongodb_1.ObjectId(id) });
                return (0, utils_1.replace_IdWithId)(entity);
            }
            catch (err) {
                throw new errors_1.NotFoundError(err.message);
            }
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.collection(this.collection).countDocuments();
        });
    }
}
exports.RepositoryImpl = RepositoryImpl;
//# sourceMappingURL=repository.js.map