import { promises } from 'fs';
import { ObjectId, OptionalUnlessRequiredId, WithId } from 'mongodb';
import { ChildEntity, Identifiable, IdType } from '../model/sharedTypes';

export const sendErrorResponse = function(req, res, status = 500, message, err?) {
    if(req.get('env') === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    })
}

export function replace_IdWithId<T extends Identifiable<IdType>>(entity:WithId<T>|OptionalUnlessRequiredId<T>):T {
    const id: IdType = entity._id.toString() as IdType;
    delete entity._id;
    let result = Object.assign({}, entity) as T;
    result.id = id;
    return result;
}

export function replaceIdWith_id<T extends Identifiable<IdType>>(entity:T):WithId<T> {
    const id = entity.id;
    delete entity.id;
    entity._id = id;
    return Object.assign({}, entity) as unknown as WithId<T>;

}