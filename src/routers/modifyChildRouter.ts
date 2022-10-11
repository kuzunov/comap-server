import * as express from 'express';
import {sendErrorResponse} from '../utils/utils';
import * as indicative from 'indicative';
import { v4 as uuidv4 } from 'uuid';
import { ChildEntity, IdType } from '../model/sharedTypes';
import { IRepository } from '../dao/repository';
import { verifyToken } from '../utils/verify-jwt';


const modifyChildRouter = (router:express.Router,entityName,validationSchema:{id:any,entity:any,entityToDelete:any}) => {
    router
    .get('/', async (req:express.Request<{parentid:string}>, res) => {
        try {
            const entities = await req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sChildRepository"].findAllByParent(req.params.parentid);
            res.status(200).json(entities);
        } catch (err) {
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    })
    .post('/',[verifyToken],async (req:express.Request<{parentid:string,childid:string}>,res)=> {
        const entity:ChildEntity<IdType> = req.body;
        try{
            await indicative.validator.validate(entity,validationSchema.entity)
            const params = req.params;
            await indicative.validator.validate(params, validationSchema.id);
            try {
                req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sChildRepository"].createChild(entity,params.parentid);
                res.status(201).json(entity);
            } catch (err) {
                console.error(`Unable to create entity: ${entity.id}.`);
                console.error(err);
                sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
            }
        } catch (err){
            sendErrorResponse(req, res, 400, `Invalid data: ${err.message}`, err);
        }
    })
    return router;
};

export default modifyChildRouter;
// Posts API Feature
