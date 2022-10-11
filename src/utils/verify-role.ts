import { ForbiddenError } from './../model/errors';
import { Response, NextFunction } from 'express';
import { UsersRepositoryImpl } from '../dao/users-repository';
import { RequestWithUserIdType } from './verify-jwt';
import { USER_ROLE } from '../model/user';


export default function verifyRole(roles:USER_ROLE[]) {
  return async function (req: RequestWithUserIdType, res: Response, next: NextFunction) {
    const userRepo = req.app.locals.UsersRepository as UsersRepositoryImpl;
    try {
      const user = await userRepo.findById(req.userId);
      if (!roles.includes(user.role)) {
        next(new ForbiddenError(`Access not allowed`));
        return;
      }
      next();
    } catch (err) {
      next(err);
      return;
    }
  }
}

