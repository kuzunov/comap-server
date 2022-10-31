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
exports.AuthRouter = void 0;
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user_1 = require("../model/user");
const indicative = require("indicative");
const validationSchemas_1 = require("../model/validationSchemas");
const utils_1 = require("../utils/utils");
const errors_1 = require("../model/errors");
const AuthRouter = () => {
    const router = express.Router();
    router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const repo = req.app.locals.UsersRepository;
        const credentials = req.body;
        try {
            yield indicative.validator.validate(credentials, validationSchemas_1.credentialsValidationSchema);
        }
        catch (errors) {
            // sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
            next(new errors_1.InvalidDataError('Invalid data'));
            return;
        }
        try {
            const user = yield repo.findByUsername(credentials.username);
            if (!user) {
                next(new errors_1.AuthenticationError(`User does not exist.`));
                return;
            }
            const passIsValid = yield bcrypt.compare(credentials.password, user.password);
            if (!passIsValid) {
                next(new errors_1.AuthenticationError(`Password incorrect.`));
                return;
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h' //expires in 1h
            });
            delete user.password;
            res.status(200).json({ token, user });
        }
        catch (err) {
            next(err);
        }
    }));
    router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const repo = req.app.locals.UsersRepository;
        const newUser = req.body;
        try {
            yield indicative.validator.validate(newUser, validationSchemas_1.userValidationsSchema.entity);
        }
        catch (errors) {
            (0, utils_1.sendErrorResponse)(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
            return;
        }
        try {
            const found = yield repo.findByUsername(newUser.username);
            if (found) {
                // sendErrorResponse(req, res, 409, `Username already taken: ${newUser.username}.`);
                throw new errors_1.InvalidDataError(`Username already taken: "${newUser.username}".`);
            }
            newUser.password = yield bcrypt.hash(newUser.password, 8);
            newUser.role = user_1.USER_ROLE.USER;
            newUser.status = user_1.USER_STATUS.ACTIVE;
            newUser.created = Date.now();
            newUser.modified = Date.now();
            const created = yield repo.create(newUser);
            delete created.password;
            res.status(201).location(`/api/users/${created.id}`).json(created);
        }
        catch (err) {
            next(err);
        }
    }));
    return router;
};
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=auth-router.js.map