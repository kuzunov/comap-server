import express = require("express");
import { sendErrorResponse } from "../utils/utils";

export const DashboardRouter = () => {
    const router = express.Router();
    router.get('/', async (req, res,next) => {
        try {
            const entities = await req.app.locals.EventsRepository.findAll();
            const reviews = [{id:1,body:1},{id:2,body:1},{id:3,body:1}];
            res.json({events: entities, reviews:reviews});
        } catch (err) {
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    })
    return router;
}