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
const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const mongodb_1 = require("mongodb");
const comap_routers_1 = require("./routers/comap-routers");
const repository_1 = require("./dao/repository");
const child_entity_repository_1 = require("./dao/child-entity-repository");
const users_repository_1 = require("./dao/users-repository");
const utils_1 = require("./utils/utils");
const errors_1 = require("./model/errors");
const rxjs_1 = require("rxjs");
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use('/api/dashboard', comap_routers_1.dashboardRouter);
app.use('/api/events', comap_routers_1.eventsRouter);
app.use('/api/users', comap_routers_1.usersRouter);
app.use('/api/organizations', comap_routers_1.organizationsRouter);
app.use('/api/comments', comap_routers_1.commentsRouter);
app.use('/api/reviews', comap_routers_1.reviewsRouter);
app.use('/api/places', comap_routers_1.placesRouter);
app.use('/api/auth', comap_routers_1.authRouter);
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.DB_URL);
    const con = yield mongodb_1.MongoClient.connect(process.env.DB_URL);
    const db = con.db(process.env.DB_NAME);
    app.locals.UsersRepository = new users_repository_1.UsersRepositoryImpl(db, 'users');
    app.locals.EventsRepository = new repository_1.RepositoryImpl(db, 'events');
    app.locals.OrganizationsRepository = new repository_1.RepositoryImpl(db, 'ogranizations');
    app.locals.CommentsRepository = new repository_1.RepositoryImpl(db, 'comments');
    app.locals.ReviewsRepository = new repository_1.RepositoryImpl(db, 'reviews');
    app.locals.PlacesRepository = new repository_1.RepositoryImpl(db, 'places');
    app.locals.CommentsChildRepository = new child_entity_repository_1.ChildRepositoryImpl(db, 'comments');
    app.locals.ReviewsChildRepository = new child_entity_repository_1.ChildRepositoryImpl(db, 'reviews');
    app.listen(+process.env.PORT, process.env.HOSTNAME, () => {
        console.log(`Listening on http://${process.env.HOSTNAME}:${process.env.PORT}`);
        app.use(function (err, req, res, next) {
            let status = 500;
            console.error(err.stack);
            if (err instanceof errors_1.AuthenticationError) {
                status = 401;
            }
            else if (err instanceof errors_1.ForbiddenError) {
                status = 403;
            }
            else if (err instanceof rxjs_1.NotFoundError) {
                status = 404;
            }
            else if (err instanceof errors_1.InvalidDataError) {
                status = 400;
            }
            (0, utils_1.sendErrorResponse)(req, res, err.status || status, `Error: ${err.message}`, err);
        });
    });
}))();
//# sourceMappingURL=comap-server.js.map