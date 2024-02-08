import { Model } from "sequelize";
interface ArtistProfilAttributes {
    id: string;
    denomination: string;
    phone_number: string;
    url_media: string;
    picture: string;
    SIRET_number: string;
}
declare class ArtistProfil extends Model<ArtistProfilAttributes> implements ArtistProfilAttributes {
    id: string;
    denomination: string;
    phone_number: string;
    url_media: string;
    picture: string;
    SIRET_number: string;
}
export default ArtistProfil;
//# sourceMappingURL=ArtistsProfil.d.ts.map