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
const uuid_1 = require("uuid");
const router = express.Router();
const eventsDb = './src/db/events.json';
// Posts API Feature
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield (0, utils_1.getJsonFromFile)(eventsDb);
        res.json(events);
    }
    catch (err) {
        (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
    }
})).get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.params;
        // await indicative.validator.validate(params, { id: 'required|regex:/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i' });
        const events = yield (0, utils_1.getJsonFromFile)(eventsDb);
        const event = events.find(event => event.id === params.id);
        res.json(event);
    }
    catch (err) {
        (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
    }
})).post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = req.body;
    try {
        // await indicative.validator.validate(event, {
        //     // id: 'required|regex:^[0-9a-f]{24}',
        //     title: 'required|string|min:3|max:60',
        //     text: 'string|max:120',
        //     authorId: 'required|regex:^[0-9a-f]{24}',
        //     content: 'string',
        //     imageUrl: 'url',
        //     categories: 'array',
        //     'categories.*': 'string',
        //     keywords: 'array',
        //     'keywords.*': 'string'
        // });
        const events = yield (0, utils_1.getJsonFromFile)(eventsDb);
        event.id = (0, uuid_1.v4)();
        events.push(event);
        try {
            (0, utils_1.writeJsonToFile)(eventsDb, events);
            res.json(event);
        }
        catch (err) {
            console.error(`Unable to create event: ${event.id}: ${event.title}.`);
            console.error(err);
            (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
        }
    }
    catch (err) {
        (0, utils_1.sendErrorResponse)(req, res, 400, `Invalid event data: ${err.message}`, err);
    }
})).put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = req.body;
    try {
        const events = yield (0, utils_1.getJsonFromFile)(eventsDb);
        events.splice(events.findIndex(dbEvent => dbEvent.id === event.id), 1, event);
        try {
            (0, utils_1.writeJsonToFile)(eventsDb, events);
            res.json(event);
        }
        catch (err) {
            console.error(`Unable to update event: ${event.id}: ${event.title}.`);
            console.error(err);
            (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
        }
    }
    catch (err) {
        (0, utils_1.sendErrorResponse)(req, res, 400, `Invalid event data: ${err.message}`, err);
    }
})).delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = req.body;
    try {
        const events = yield (0, utils_1.getJsonFromFile)(eventsDb);
        events.splice(events.findIndex(dbEvent => dbEvent.id === event.id), 1);
        try {
            (0, utils_1.writeJsonToFile)(eventsDb, events);
            res.json(event);
        }
        catch (err) {
            console.error(`Unable to delete event: ${event.id}: ${event.title}.`);
            console.error(err);
            (0, utils_1.sendErrorResponse)(req, res, 500, `Server error: ${err.message}`, err);
        }
    }
    catch (err) {
        (0, utils_1.sendErrorResponse)(req, res, 400, `Invalid event data: ${err.message}`, err);
    }
}));
exports.default = router;
//# sourceMappingURL=events-router.js.map