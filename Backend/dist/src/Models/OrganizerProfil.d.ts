import { Model } from "sequelize";
interface OrganizerProfilAttributes {
    id: string;
    denomination: string;
    phone_number: string;
    full_adress: string;
    SIRET_number: number;
    more_info: string;
}
declare class OrganizerProfil extends Model<OrganizerProfilAttributes> implements OrganizerProfilAttributes {
    id: string;
    denomination: string;
    phone_number: string;
    full_adress: string;
    SIRET_number: number;
    more_info: string;
}
export default OrganizerProfil;
//# sourceMappingURL=OrganizerProfil.d.ts.map