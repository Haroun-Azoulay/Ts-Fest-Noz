const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const Artist_profile = require("./Artist_profile"); 
const Event = require("./Event"); 

class ArtistProfileEvent extends Model {}

ArtistProfileEvent.init({
  artisteId: {
    type: DataTypes.UUID,
    references: { model: Artist_profile, key: 'id' }
  },
  eventId: {
    type: DataTypes.UUID,
    references: { model: Event, key: 'id' }
  }
}, { sequelize, modelName: 'artist_profile_event' });


Artist_profile.belongsToMany(Event, { through: ArtistProfileEvent });
Event.belongsToMany(Artist_profile, { through: ArtistProfileEvent });

module.exports = ArtistProfileEvent;