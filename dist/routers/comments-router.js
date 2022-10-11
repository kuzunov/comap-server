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
const modifyChildRouter = (router, dbFile) => {
    router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const entities = yield (0, utils_1.getJsonFromFile)(dbFile);
            res.json(entities.filter(childEntity => childEntity.parentEntityId === req.params.parentid));
        }
        catch (err) {
            (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
        }
    }));
    return router;
};
exports.default = modifyChildRouter;
// Posts API Feature
//# sourceMappingURL=comments-router.js.map