import { Model } from "sequelize";
export type CityAttributes = {
    id: string;
    user_id: number;
    insee_code: number;
    city_name: string;
    text: string;
    address: string;
    zip_code: number;
    label: string;
    longitude: number;
    latitude: number;
    color: string;
    departement_name: string;
    departement_number: number;
    region_name: string;
    region_geo_json: string;
};
declare class City extends Model<CityAttributes> {
    id: string;
    user_id: number;
    insee_code: number;
    city_name: string;
    address: string;
    text: string;
    zip_code: number;
    label: string;
    longitude: number;
    latitude: number;
    color: string;
    departement_name: string;
    departement_number: number;
    region_name: string;
    region_geo_json: string;
}
export default City;
//# sourceMappingURL=City.d.ts.map