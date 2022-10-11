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
const express = require("express");
const utils_1 = require("../utils/utils");
const indicative = require("indicative");
const uuid_1 = require("uuid");
const customRouter = (dbFile, entityName, childRouter = false, validationSchema) => {
    const router = (childRouter) ? express.Router({ mergeParams: true }) : express.Router();
    router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (childRouter) {
            return next();
        }
        try {
            const entities = yield (0, utils_1.getJsonFromFile)(dbFile);
            res.json(entities);
        }
        catch (err) {
            (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
        }
    })).get('/:parentid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const params = req.params;
            yield indicative.validator.validate(params, { parentid: validationSchema.id });
            const entities = yield (0, utils_1.getJsonFromFile)(dbFile);
            const entity = entities.find(entity => entity.id === params.parentid);
            (entity) ? res.json(entity) : (0, utils_1.sendErrorResponse)(req, res, 404, `Entity ${params.parentid} not found`, new Error());
        }
        catch (err) {
            (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
        }
    })).post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (childRouter) {
            return next();
        }
        const entity = req.body;
        try {
            yield indicative.validator.validate(entity, validationSchema.entity);
            const entities = yield (0, utils_1.getJsonFromFile)(dbFile);
            entity.id = (0, uuid_1.v4)();
            entities.push(entity);
            try {
                (0, utils_1.writeJsonToFile)(dbFile, entities);
                res.json(entity);
            }
            catch (err) {
                console.error(`Unable to create ${entityName}: ${entity.id}.`);
                console.error(err);
                (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
            }
        }
        catch (err) {
            (0, utils_1.sendErrorResponse)(req, res, 400, `Invalid ${entityName} data: ${err.message}`, err);
        }
    })).put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const entity = req.body;
        try {
            yield indicative.validator.validate(entity, validationSchema.entity);
            const entities = yield (0, utils_1.getJsonFromFile)(dbFile);
            entities.splice(entities.findIndex(dbEntity => dbEntity.id === entity.id), 1, entity);
            try {
                (0, utils_1.writeJsonToFile)(dbFile, entities);
                res.json(entity);
            }
            catch (err) {
                console.error(`Unable to update ${entityName}: ${entity.id}.`);
                console.error(err);
                (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
            }
        }
        catch (err) {
            (0, utils_1.sendErrorResponse)(req, res, 400, `Invalid ${entityName} data: ${err.message}`, err);
        }
    })).delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const entity = req.body;
        try {
            yield indicative.validator.validate(entity, validationSchema.entityToDelete);
            const entities = yield (0, utils_1.getJsonFromFile)(dbFile);
            const indexToDelete = entities.findIndex(dbEntity => dbEntity.id === entity.id);
            const deletedEntity = entities[indexToDelete];
            entities.splice(indexToDelete, 1);
            try {
                (0, utils_1.writeJsonToFile)(dbFile, entities);
                res.json(deletedEntity);
            }
            catch (err) {
                console.error(`Unable to delete ${entityName}: ${entity.id}.`);
                console.error(err);
                (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
            }
        }
        catch (err) {
            (0, utils_1.sendErrorResponse)(req, res, 400, `Invalid ${entityName} data: ${err.message}`, err);
        }
    }));
    return router;
};
exports.default = customRouter;
// Posts API Feature
//# sourceMappingURL=custom-router.js.map