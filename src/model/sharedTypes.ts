import { ObjectId } from "mongodb";
import { IUser, USER_ROLE, USER_STATUS } from "./user";


export type STATUS_FILTER = USER_STATUS | undefined;

export interface Identifiable<IdType> {
  id: IdType;
  created:number,
  modified:number,
  _id?:IdType;
}
export interface ChildEntity<IdType> extends Identifiable<IdType>{
  parentEntityId: ObjectId;
  created:number,
  modified:number,
}

export type IdType = string | undefined;

export type UserListener = (user: IUser) => void;

export type FilterT = {
  [key: string]: USER_ROLE | USER_STATUS | undefined;
  role: USER_ROLE | undefined;
  status: USER_STATUS | undefined;
};
export type SKILLS = {
  [key:string]: "beginner"|"intermediate"|"master";
}
export type entities = "event"|"organization"|"review"|"user"|"comment"|"place";

