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
const verify_jwt_1 = require("../utils/verify-jwt");
const errors_1 = require("../model/errors");
const verify_role_1 = require("../utils/verify-role");
const user_1 = require("../model/user");
const customRouter = (entityName, childRouter = false, validationSchema) => {
    const router = (childRouter) ? express.Router({ mergeParams: true }) : express.Router();
    router
        .get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (childRouter) {
            return next();
        }
        try {
            const entities = yield req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sRepository"].findAll();
            res.json(entities);
        }
        catch (err) {
            (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
        }
    }))
        .get((childRouter) ? '/:childid' : '/:parentid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const params = req.params;
            const idToCheck = (childRouter) ? params.childid : params.parentid;
            yield indicative.validator.validate(idToCheck, (childRouter) ? validationSchema.childEntity : validationSchema.id);
            const entity = yield req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sRepository"].findById(idToCheck);
            (entity) ? res.json(entity) : (0, utils_1.sendErrorResponse)(req, res, 404, `Entity ${params.parentid} not found`, new Error());
        }
        catch (err) {
            (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
        }
    }))
        .post('/', [verify_jwt_1.verifyToken, (0, verify_role_1.default)([user_1.USER_ROLE.ORGANIZATOR, user_1.USER_ROLE.ADMIN])], (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (childRouter) {
            return next();
        }
        const entity = req.body;
        entity.created = Date.now();
        entity.modified = Date.now();
        try {
            yield indicative.validator.validate(entity, validationSchema.entity);
            try {
                console.log(entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sRepository");
                const returnEntity = yield req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sRepository"].create(entity);
                res.status(201).json(returnEntity);
            }
            catch (err) {
                console.error(`Unable to create ${entityName}: ${entity.id}.`);
                console.error(err);
                (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
            }
        }
        catch (err) {
            next(new errors_1.InvalidDataError(`Invalid ${entityName} data: ${err.message}`));
        }
    }))
        .put('/', [verify_jwt_1.verifyToken, (0, verify_role_1.default)([user_1.USER_ROLE.USER, user_1.USER_ROLE.ORGANIZATOR, user_1.USER_ROLE.ADMIN])], (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const entity = req.body;
        try {
            yield indicative.validator.validate(entity, validationSchema.entity);
            try {
                //check user id in url and req.body, check if user body and old user id is the same
                const entityToReturn = yield req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sRepository"].update(entity);
                res.json(entityToReturn);
            }
            catch (err) {
                console.error(`Unable to update ${entityName}: ${entity.id}.`);
                console.error(err);
                (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
            }
        }
        catch (err) {
            next(new errors_1.InvalidDataError(`Invalid ${entityName} data: ${err.message}`));
        }
    }))
        .delete('/', [verify_jwt_1.verifyToken, (0, verify_role_1.default)([user_1.USER_ROLE.USER, user_1.USER_ROLE.ORGANIZATOR, user_1.USER_ROLE.ADMIN])], (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const entity = req.body;
        try {
            yield indicative.validator.validate(entity, validationSchema.entityToDelete);
            try {
                const deletedEntity = yield req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sRepository"].deleteById(entity.id);
                res.json(deletedEntity);
            }
            catch (err) {
                console.error(`Unable to delete ${entityName}: ${entity.id}.`);
                console.error(err);
                (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
            }
        }
        catch (err) {
            next(new errors_1.InvalidDataError(`Invalid ${entityName} data: ${err.message}`));
        }
    }));
    return router;
};
exports.default = customRouter;
// Posts API Feature
//# sourceMappingURL=custom-router.js.map