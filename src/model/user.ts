import { Identifiable, IdType, SKILLS } from "./sharedTypes";

export interface IUser extends Identifiable<IdType>{
  [key: string]: any;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  gender: USER_GENDER;
  role: USER_ROLE;
  status: USER_STATUS;
  avatar: string | undefined;
  description?: string;
  location?:google.maps.LatLng|undefined;
  skills?:SKILLS[];

};
export interface UserCredentials {
  username:string;
  password:string;
};

export enum USER_STATUS {
    ACTIVE = 1,
    SUSPENDED,
    DEACTIVATED,
  }
  export enum USER_ROLE {
    GUEST = 0,
    USER,
    ORGANIZATOR,
    ADMIN
  }
  export type USER_GENDER = "m" | "f";

  export const Guest: IUser = {
    id:'0',
    username: "Guest",
    firstName: "",
    lastName: "",
    password: "",
    gender: "f",
    status: USER_STATUS.ACTIVE,
    avatar: "",
    description:"",
    created: 0,
    modified: 0,
    role: USER_ROLE.GUEST,
  };