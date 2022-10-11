import { ChildEntity, entities, IdType } from "./sharedTypes";
import { IUser } from "./user";

export interface IReview extends ChildEntity<IdType>{
    body:string,
    authorId:string,
    rating:number;
    reviewedId:string;
}