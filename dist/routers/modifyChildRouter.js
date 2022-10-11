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
const uuid_1 = require("uuid");
const modifyChildRouter = (router, dbFile, validationSchema) => {
    router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const entities = yield (0, utils_1.getJsonFromFile)(dbFile);
            res.json(entities.filter(childEntity => childEntity.parentEntityId === req.params.parentid));
        }
        catch (err) {
            (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
        }
    })).post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const entity = req.body;
        try {
            yield indicative.validator.validate(entity, validationSchema);
            const params = req.params;
            yield indicative.validator.validate(params, { parentid: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' });
            const entities = yield (0, utils_1.getJsonFromFile)(dbFile);
            entity.id = (0, uuid_1.v4)();
            entity.parentEntityId = params.parentid;
            entities.push(entity);
            try {
                (0, utils_1.writeJsonToFile)(dbFile, entities);
                res.json(entity);
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