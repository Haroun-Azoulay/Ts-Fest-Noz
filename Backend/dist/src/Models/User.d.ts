import { Request } from 'express';
import { Model } from "sequelize";
export type UserAttributes = {
    id?: string;
    lastname: string;
    firstname: string;
    password: string;
    email: string;
    role: string;
    pseudo: string;
};
declare class User extends Model<UserAttributes> {
    id?: string;
    lastname: string;
    firstname: string;
    password: string;
    email: string;
    role: string;
    pseudo: string;
    static updateUserRole: (userId: string, newRole: string) => Promise<boolean>;
}
export interface UserRequest extends Request {
    user?: UserAttributes;
}
export default User;
//# sourceMappingURL=User.d.ts.map