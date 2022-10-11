import * as jwt from 'jsonwebtoken';
import { sendErrorResponse } from './utils';
import * as express from 'express'
import { IdType } from '../model/sharedTypes';


export type RequestWithUserIdType = express.Request &  {userId:IdType}
export const verifyToken = (req:RequestWithUserIdType, res, next) => {
    const bearerHeader = req.headers["authorization"];
    const bearer = (bearerHeader)?bearerHeader.split(' '):[];
    const token = (bearer.length>1)?bearer[1]:undefined;
  
    if (!token) {
      return sendErrorResponse(req,res,403,'No token provided.');
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded:{id:IdType}) => {
      if (err) {
        return next({status: 401,message:`Unauthorized. ${err.toString()}`,error: err});
      }
      req.userId = decoded.id;
      next();
    });
  };