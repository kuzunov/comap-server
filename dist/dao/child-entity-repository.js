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
exports.ChildRepositoryImpl = void 0;
const mongodb_1 = require("mongodb");
const errors_1 = require("../model/errors");
const utils_1 = require("../utils/utils");
const repository_1 = require("./repository");
class ChildRepositoryImpl extends repository_1.RepositoryImpl {
    constructor(db, collection) {
        super(db, collection);
        this.db = db;
        this.collection = collection;
    }
    findAllByParent(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = this.db.collection(this.collection).find({ parentEntityId: new mongodb_1.ObjectId(parentId) });
                const entitiesArray = yield entities.toArray();
                return entitiesArray.map(entity => (0, utils_1.replace_IdWithId)(entity));
            }
            catch (err) {
                throw new errors_1.NotFoundError(err.message);
            }
        });
    }
    createChild(entity, parentEntityId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                entity.created = Date.now();
                entity.modified = Date.now();
                entity.parentEntityId = new mongodb_1.ObjectId(parentEntityId);
                const document = entity;
                const { acknowledged, insertedId } = yield this.db.collection(this.collection).insertOne(document);
                if (acknowledged) {
                    console.log(`Successfully inserted 1 document with ID ${insertedId}`);
                }
                return (0, utils_1.replace_IdWithId)(document);
            }
            catch (err) {
                throw new errors_1.NotFoundError(err.message);
            }
        });
    }
}
exports.ChildRepositoryImpl = ChildRepositoryImpl;
//# sourceMappingURL=child-entity-repository.js.map