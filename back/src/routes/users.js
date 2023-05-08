"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../control/UserController"));
const router = express_1.default.Router();
const userController = new UserController_1.default();
router.post('/create', userController.create);
router.post('/login', userController.login);
router.post('/forgot', userController.resetPassword);
router.post('/change-password', userController.changePassword);
router.post('/email', userController.findByEmail);
router.post('/authentication', userController.authentication);
router.get('/read', userController.read);
router.put('/update', userController.update);
router.delete('/delete', userController.remove);
exports.default = router;
