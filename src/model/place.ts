import { Identifiable, IdType } from "./sharedTypes";

export interface IPlace extends Identifiable<IdType>{
    location: google.maps.LatLng
    description?: string,
}