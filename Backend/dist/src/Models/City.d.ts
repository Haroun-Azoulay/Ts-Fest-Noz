import { Model } from "sequelize";
interface CityAttributes {
    id: string;
    insee_code: number;
    city_name: string;
    zip_code: number;
    label: string;
    longitude: number;
    latitude: number;
    departement_name: string;
    departement_number: number;
    region_name: string;
    region_geo_json: string;
}
declare class City extends Model<CityAttributes> implements CityAttributes {
    id: string;
    insee_code: number;
    city_name: string;
    zip_code: number;
    label: string;
    longitude: number;
    latitude: number;
    departement_name: string;
    departement_number: number;
    region_name: string;
    region_geo_json: string;
}
export default City;
//# sourceMappingURL=City.d.ts.map