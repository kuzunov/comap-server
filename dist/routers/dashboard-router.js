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
exports.DashboardRouter = void 0;
const express = require("express");
const utils_1 = require("../utils/utils");
const DashboardRouter = () => {
    const router = express.Router();
    router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const entities = yield req.app.locals.EventsRepository.findAll();
            const reviews = [{ id: 1, body: 1 }, { id: 2, body: 1 }, { id: 3, body: 1 }];
            res.json({ events: entities, reviews: reviews });
        }
        catch (err) {
            (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
        }
    }));
    return router;
};
exports.DashboardRouter = DashboardRouter;
//# sourceMappingURL=dashboard-router.js.map