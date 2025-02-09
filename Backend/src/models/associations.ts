import Event from "./Event";
import Payment from "./Payment";
import Post from "./Post";
import Commentary from "./Commentary";
import City from "./City";
import User from "./User";
import Group from "./Group";
import GroupUser from "./GroupUser";
import GoodieType from "./GoodieType";
import Goodie from "./Goodie";
import Order from "./Order";
import OrderDetail from "./OrderDetail";
import ArtistProfil from "./ArtistsProfil";
import OrganizerProfil from "./OrganizerProfil";

User.hasOne(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

OrderDetail.hasOne(Order, {
  foreignKey: "orderDetailId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Order.belongsTo(OrderDetail, { foreignKey: "orderDetailId" });

User.hasMany(Goodie, { foreignKey: "userId" });
Goodie.belongsTo(User, { foreignKey: "userId" });

Group.hasMany(Goodie, {
  foreignKey: "groupId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Goodie.belongsTo(Group, { foreignKey: "groupId" });

GoodieType.hasMany(Goodie, {
  foreignKey: "goodieTypeId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Goodie.belongsTo(GoodieType, { foreignKey: "goodieTypeId" });

Group.belongsToMany(User, { through: "GroupUsers" });
User.belongsToMany(Group, { through: "GroupUsers" });

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Commentary, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Commentary.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(City, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
City.belongsTo(User, { foreignKey: "userId" });

City.hasOne(Event, {
  foreignKey: "city_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Event.belongsTo(City, { foreignKey: "city_id" });

Event.hasMany(Payment, { foreignKey: "event_id" });
Payment.belongsTo(Event, { foreignKey: "event_id" });

User.hasMany(Event, { foreignKey: "userId" });
Event.belongsTo(User, { foreignKey: "userId" });

User.hasOne(ArtistProfil, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
ArtistProfil.belongsTo(User, { foreignKey: "userId" });

User.hasOne(OrganizerProfil, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
OrganizerProfil.belongsTo(User, { foreignKey: "userId" });

export {
  Event,
  Payment,
  GoodieType,
  Goodie,
  Order,
  OrderDetail,
  GroupUser,
  Post,
  Commentary,
  City,
  ArtistProfil,
  OrganizerProfil,
};
