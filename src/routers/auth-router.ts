import express = require("express");
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { UsersRepositoryImpl } from "../dao/users-repository";
import { UserCredentials, USER_ROLE, USER_STATUS } from "../model/user";
import * as indicative from 'indicative';
import { credentialsValidationSchema, userValidationsSchema } from "../model/validationSchemas";
import { sendErrorResponse } from "../utils/utils";
import { AuthenticationError, InvalidDataError } from "../model/errors";


export const AuthRouter = () => {
    const router = express.Router();
    router.post('/login', async (req,res,next)=> {
        const repo: UsersRepositoryImpl = req.app.locals.UsersRepository;
        const credentials = req.body as UserCredentials;
        try {
            await indicative.validator.validate(credentials, credentialsValidationSchema);
        } catch (errors) {
            // sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
            next(new InvalidDataError('Invalid data'))
            return;
        }
        try {
            const user = await repo.findByUsername(credentials.username);
            if (!user) {
                next(new AuthenticationError(`User does not exist.`));
                return;
            }
            const passIsValid = await bcrypt.compare(credentials.password, user.password);
            if (!passIsValid) {
                next(new AuthenticationError(`Password incorrect.`));
                return;
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h' //expires in 1h
            });
            delete user.password;
            res.status(200).json({ token, user });
        }catch (err) {
            next(err);
        }


    })
    router.post('/register', async (req,res,next)=> {
        const repo: UsersRepositoryImpl = req.app.locals.UsersRepository;
        const newUser = req.body;
        try {
            await indicative.validator.validate(newUser, userValidationsSchema.entity);
        } catch (errors) {
            sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
            return;
        }
        try {
            const found = await repo.findByUsername(newUser.username);
            if (found) {
                // sendErrorResponse(req, res, 409, `Username already taken: ${newUser.username}.`);
                throw new InvalidDataError(`Username already taken: "${newUser.username}".`);
            }
            newUser.password = await bcrypt.hash(newUser.password, 8);
            newUser.role = USER_ROLE.USER;
            newUser.status = USER_STATUS.ACTIVE;
            newUser.created = Date.now();
            newUser.modified = Date.now();

            const created = await repo.create(newUser);
            delete created.password;
            res.status(201).location(`/api/users/${created.id}`).json(created);

        }catch (err) {
            next(err);
        }

    })
    return router;
};
