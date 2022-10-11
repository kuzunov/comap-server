import { Identifiable, IdType } from "./sharedTypes";
import { IUser } from "./user";

export interface IOrganization extends Identifiable<IdType>{
    name:string;
    members:IUser[];
    mainLocation: google.maps.LatLngLiteral;
};