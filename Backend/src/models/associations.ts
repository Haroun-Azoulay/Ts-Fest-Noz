import Event from "./Event";
import Payment from "./Payment";
import Post from "./Post";
import Commentary from "./Commentary";
import City from "./City";
import Map from "./Map";
import User from "./User";
import Group from "./Group";
import GroupDetail from "./GroupDetail";
import GoodieType from "./GoodieType";
import Goodie from "./Goodie";
import Order from "./Order";
import OrderDetail from "./OrderDetail";

Event.hasMany(Payment, { foreignKey: "payment_id", as: "payment" });
Payment.belongsTo(Event, { foreignKey: "payment_id" });

GoodieType.hasMany(Goodie, { foreignKey: "goodieTypeId", onDelete: "CASCADE" });
Goodie.belongsTo(GoodieType, { foreignKey: "goodieTypeId" });

Group.hasMany(Goodie, { foreignKey: "groupId", onDelete: "CASCADE" });
Goodie.belongsTo(Group, { foreignKey: "groupId" });

Group.hasMany(GroupDetail, { foreignKey: "groupId", onDelete: "CASCADE" });
GroupDetail.belongsTo(Group, { foreignKey: "groupId" });

Order.hasMany(OrderDetail, { foreignKey: "orderId", onDelete: "CASCADE" });
OrderDetail.belongsTo(Order, { foreignKey: "orderId" });

Post.hasMany(Commentary, { foreignKey: "postId" });

User.hasMany(City, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Post, { foreignKey: "userId" });
//User.hasMany(Map, { foreignKey: "user_id", as: "maps" });

export { Event, Payment, GoodieType, Goodie };
