import { existsSync } from "fs";
import { OptionalUnlessRequiredId } from "mongodb";
import { AppError, NotFoundError } from "../model/errors";
import { IUser } from "../model/user";
import { replace_IdWithId } from "../utils/utils";
import { RepositoryImpl } from "./repository";

export class UsersRepositoryImpl extends RepositoryImpl<IUser> {
    async findByUsername(username:string):Promise<IUser>{
        try{
            const user = await this.db.collection<IUser>(this.collection).findOne({username});
            if(!user) {
                return null;
            }
            return replace_IdWithId(user) ;
        }catch(err) {
            throw new AppError(500, `Error in DB`)
        }
    }
    async create(entity: IUser): Promise<IUser> {
        delete entity.id;
        entity.created = Date.now();
        entity.modified = Date.now();
        const document = entity as OptionalUnlessRequiredId<IUser>;
        const userNameExists = await this.findByUsername(entity.username);
        if (!userNameExists) {
            const { acknowledged, insertedId } = await this.db.collection<IUser>(this.collection).insertOne(document);
            if (acknowledged) {
                console.log(`Successfully inserted 1 document with ID ${insertedId}`);
            }
            
        return replace_IdWithId(document);
        } else {
            throw new AppError(409, 'Username already exists')
        }
    }
}