// import { DataTypes, Model } from "sequelize";
// import sequelizeConnection from "../../config/database";
// import { ArtistProfilAttributes } from "../interfaces/types";

// class ArtistProfil
//   extends Model<ArtistProfilAttributes>
//   implements ArtistProfilAttributes
// {
//   public id!: string;
//   public denomination!: string;
//   public phone_number!: string;
//   public url_media!: string;
//   public picture!: string;
//   public SIRET_number!: string;
// }

// ArtistProfil.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       primaryKey: true,
//     },
//     denomination: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       primaryKey: true,
//     },
//     phone_number: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       unique: true,
//     },
//     url_media: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     picture: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     SIRET_number: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize: sequelizeConnection,
//     modelName: "ArtistProfil",
//   },
// );

// export default ArtistProfil;
