"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../Controllers/userController"));
const verifyToken_1 = __importDefault(require("../Middlewares/verifyToken"));
const router = express_1.default.Router();
router.post('/signup', userController_1.default.signup);
router.get('/my-user', verifyToken_1.default, userController_1.default.getUserInfo);
router.post('/signin', userController_1.default.signin);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map