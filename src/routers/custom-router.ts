import * as express from 'express';
import { sendErrorResponse} from '../utils/utils';
import * as indicative from 'indicative';
import { entities, Identifiable, IdType } from '../model/sharedTypes';
import { Router } from 'express';
import { verifyToken } from '../utils/verify-jwt';
import { InvalidDataError } from '../model/errors';

type customRouterType = <T extends Identifiable<IdType>>(
    entityName:entities,
    childRouter?:boolean,
    validationSchema?:{id:any,entity:any,entityToDelete:any,childEntity:any}, // fix with type
    ) => Router;


const customRouter:customRouterType = <T>(entityName,childRouter=false,validationSchema) => {
    const router = (childRouter)?express.Router({mergeParams:true}):express.Router();
    router
    .get('/', async (req, res,next) => {
        if(childRouter) {return next()}
        try {
            const entities = await req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sRepository"].findAll();
            res.json(entities);
        } catch (err) {
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    })
    .get((childRouter)?'/:childid':'/:parentid', async (req:express.Request<{parentid:string,childid:string}>,res) => {
        try{
            const params = req.params;
            const idToCheck = (childRouter)?params.childid:params.parentid
            await indicative.validator.validate(idToCheck, (childRouter)?validationSchema.childEntity:validationSchema.id);
            const entity = await req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sRepository"].findById(idToCheck);
            (entity)?res.json(entity):sendErrorResponse(req,res,404,`Entity ${params.parentid} not found`,new Error())
        }
        catch(err){
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`,err);
        }
    })
    .post('/',[verifyToken],async (req,res,next)=> {
        if(childRouter) {return next()}
        const entity = req.body;
        try{
            await indicative.validator.validate(entity,validationSchema.entity);
            try {
                console.log(entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sRepository")
                const returnEntity = await req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sRepository"].create(entity)
                res.status(201).json(returnEntity);
            } catch (err) {
                console.error(`Unable to create ${entityName}: ${entity.id}.`);
                console.error(err);
                sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
            }
        } catch (err){
            next(new InvalidDataError( `Invalid ${entityName} data: ${err.message}`));
        }
    })
    .put('/',[verifyToken], async (req, res,next)=> {
        const entity = req.body;
        try {
            await indicative.validator.validate(entity,validationSchema.entity);
            try {
                //check user id in url and req.body, check if user body and old user id is the same
                const entityToReturn = await req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sRepository"].update(entity);
                res.json(entityToReturn)
            } catch(err){
                console.error(`Unable to update ${entityName}: ${entity.id}.`);
                console.error(err);
                sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
            }
        } catch (err) {
            next(new InvalidDataError( `Invalid ${entityName} data: ${err.message}`));
        }
    })
    .delete('/',[verifyToken], async (req,res,next) => {
        const entity = req.body;
        try {
            await indicative.validator.validate(entity,validationSchema.entityToDelete)
            try {
                const deletedEntity = await req.app.locals[entityName.charAt(0).toUpperCase() + entityName.slice(1) + "sRepository"].deleteById(entity.id);
                res.json(deletedEntity);
            } catch(err){
                console.error(`Unable to delete ${entityName}: ${entity.id}.`);
                console.error(err);
                sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
            }
        } catch (err) {
            next(new InvalidDataError( `Invalid ${entityName} data: ${err.message}`));        }
    });
    return router;
};

export default customRouter;
// Posts API Feature
