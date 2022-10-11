"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv");
+dotenv.config();
const comap_routers_1 = require("./routers/comap-routers");
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use('/api/events', comap_routers_1.eventsRouter);
app.use('/api/users', comap_routers_1.usersRouter);
app.use('/api/organizations', comap_routers_1.organizationsRouter);
app.use('/api/comments', comap_routers_1.commentsRouter);
app.use('/api/reviews', comap_routers_1.reviewsRouter);
app.use('/api/places', comap_routers_1.placesRouter);
// app.use(function (err, req, res, next) {
//     console.error(err.stack)
//     sendErrorResponse(req, res, err.status || 500, `Server error: ${err.message}`, err);
// })
app.listen(+process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Listening on http://${process.env.HOSTNAME}:${process.env.PORT}`);
});
//# sourceMappingURL=comap-server.js.map