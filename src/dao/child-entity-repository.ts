import { Db, ObjectId, OptionalUnlessRequiredId, WithId } from "mongodb";
import { AppError, NotFoundError } from "../model/errors";
import { ChildEntity, Identifiable, IdType } from "../model/sharedTypes";
import { replace_IdWithId } from "../utils/utils";
import { RepositoryImpl } from "./repository";

export class ChildRepositoryImpl<T extends ChildEntity<IdType>> extends RepositoryImpl<T> {
    constructor(protected db:Db,protected collection: string){
        super(db,collection)
    }
    async findAllByParent(parentId:IdType):Promise<T[]>{
        try {
            const entities = this.db.collection(this.collection).find({parentEntityId: new ObjectId(parentId)});
            const entitiesArray = await entities.toArray() as WithId<T>[];
            return entitiesArray.map(entity => replace_IdWithId(entity));
        } catch(err) {
            throw new NotFoundError(err.message);
        }
    }
    async createChild(entity: ChildEntity<IdType>,parentEntityId:IdType):Promise<T> {
        try {
            entity.created = Date.now();
            entity.modified = Date.now();
            entity.parentEntityId = new ObjectId(parentEntityId);
            const document = entity as OptionalUnlessRequiredId<T>;
            const { acknowledged, insertedId } = await this.db.collection<T>(this.collection).insertOne(document);
            if (acknowledged) {
                console.log(`Successfully inserted 1 document with ID ${insertedId}`);
            }
            return replace_IdWithId(document);
        } catch(err){
            throw new NotFoundError(err.message);

        }
    }
}