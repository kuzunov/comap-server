import { promises } from "fs"
import { IComment } from "../model/comment"
import { IEvent } from "../model/event"
import { IOrganization } from "../model/organization"
import { IPlace } from "../model/place"
import { IReview } from "../model/review"
import { Identifiable, IdType} from "../model/sharedTypes"
import { IUser } from "../model/user"
import { v4 as uuidv4 } from 'uuid';
import { Db, ObjectId, ObjectID, OptionalUnlessRequiredId, WithId } from "mongodb"
import { replaceIdWith_id, replace_IdWithId } from "../utils/utils"
import { AppError, InvalidDataError, NotFoundError } from "../model/errors"


export interface IRepository<T> {
    create(entity:T):Promise<T>
    update(entity:T):Promise<T>
    deleteById(id:IdType):Promise<T>
    findAll():Promise<T[]>
    findById(id:IdType):Promise<T>
    count(entity:T):Promise<number>
}

export class RepositoryImpl<T extends Identifiable<IdType>> implements IRepository<T> {
    constructor(protected db:Db,protected collection: string){}

    async create(entity: T): Promise<T> {
        delete entity.id;
        entity.created = Date.now();
        entity.modified = Date.now();
        const document = entity as OptionalUnlessRequiredId<T>;
        const { acknowledged, insertedId } = await this.db.collection<T>(this.collection).insertOne(document);
        if (acknowledged) {
            console.log(`Successfully inserted 1 document with ID ${insertedId}`);
        }
        return replace_IdWithId(document);
        
    }
    async update(entity: T): Promise<T> {
        if (!entity.id) {
            throw new InvalidDataError(`ID cannot be undefined.`)
        }
        const found =  await this.findById(entity.id);
        if (!found) {
            throw new NotFoundError(`ID="${entity.id} does not exist and can not be modified.`);
        }
        entity.modified = Date.now();
        replaceIdWith_id(entity);
        var myquery = { _id: new ObjectId(entity._id) };
        var newvalues = { $set: entity };
        const updateRes = await this.db.collection(this.collection)
            .updateOne(myquery, newvalues);
        // console.log(updateRes);
        if (updateRes.acknowledged && updateRes.modifiedCount === 1) {
            console.log(`Successfully updated: ${JSON.stringify(entity)}`);
            return entity;
        }
        throw new AppError(500, `Error inserting: "${JSON.stringify(entity)}"`);
    }
    async deleteById(id: string): Promise<T> {
        const found = await this.findById(id);
        if (!found) {
            throw new AppError(404, `ID="${id} does not exist and can't be modified.`);
        }
        const res = await this.db.collection(this.collection).deleteOne({_id: new ObjectId(id)});
        if (res.acknowledged && res.deletedCount === 1) {
            console.log(`Deleted: ${JSON.stringify(found)}`);
            return found;
        }
        throw new AppError(500, `Error deleting: "${JSON.stringify(found)}"`);
    }
    async findAll(): Promise<T[]> {
        const entities = await this.db.collection<T>(this.collection).find().toArray()
        return entities.map(result => replace_IdWithId<T>(result));
    }
    async findById(id: string): Promise<T> {
        try {
            const entity = await this.db.collection(this.collection).findOne<WithId<T>>({_id: new ObjectId(id)});
            return replace_IdWithId(entity)
        } catch(err) {
            throw new NotFoundError(err.message);
        }
    }
    async count(): Promise<number> {
        return this.db.collection(this.collection).countDocuments();

    }
}

