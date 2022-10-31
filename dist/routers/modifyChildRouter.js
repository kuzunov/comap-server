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
const utils_1 = require("../utils/utils");
const indicative = require("indicative");
const verify_jwt_1 = require("../utils/verify-jwt");
const modifyChildRouter = (router, entityName, validationSchema) => {
    router
        .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const entities = yield req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sChildRepository"].findAllByParent(req.params.parentid);
            res.status(200).json(entities);
        }
        catch (err) {
            (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
        }
    }))
        .post('/', [verify_jwt_1.verifyToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const entity = req.body;
        try {
            entity.created = Date.now();
            entity.modified = Date.now();
            yield indicative.validator.validate(entity, validationSchema.entity);
            const params = req.params;
            yield indicative.validator.validate(params, validationSchema.id);
            try {
                req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sChildRepository"].createChild(entity, params.parentid);
                res.status(201).json(entity);
            }
            catch (err) {
                console.error(`Unable to create entity: ${entity.id}.`);
                console.error(err);
                (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
            }
        }
        catch (err) {
            (0, utils_1.sendErrorResponse)(req, res, 400, `Invalid data: ${err.message}`, err);
        }
    }));
    return router;
};
exports.default = modifyChildRouter;
// Posts API Feature
//# sourceMappingURL=modifyChildRouter.js.map