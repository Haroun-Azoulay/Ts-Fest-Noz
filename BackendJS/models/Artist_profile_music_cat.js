const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const Artist_profile = require("./Artist_profile"); 
const Music_category = require("./Music_category"); 

class Artist_profile_music_cat extends Model {}

Artist_profile_music_cat.init({
  artiste_id: {
    type: DataTypes.UUID,
    references: { model: Artist_profile, key: 'id' }
  },
  music_category: {
    type: DataTypes.INTEGER,
    references: { model: Music_category, key: 'id' } // Correction ici
  }
}, { sequelize, modelName: 'artist_profile_music_cat' });


Artist_profile.belongsToMany(Music_category, { through: Artist_profile_music_cat });
Music_category.belongsToMany(Artist_profile, { through: Artist_profile_music_cat });

module.exports = Artist_profile_music_cat;