"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const ValidationToken_1 = __importDefault(require("../ValidationToken"));
class UserController {
    constructor() {
        this.findUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email: emailUser } = req.body;
            const find = yield this.userService.findUser(emailUser);
            if (!find)
                return res.status(200).json({ message: "Usuário não encontrado" });
            const { _id, firstName, lastName, email, dateOfBirth } = find;
            return res.status(200).json({
                message: "Usuário localizado com sucesso",
                user: { _id, firstName, lastName, email, dateOfBirth },
            });
        });
        this.findByEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const find = yield this.userService.findByEmail(email);
            return res.status(200).json({
                exist: find,
            });
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email: emailUser, password } = req.body;
            const find = yield this.userService.login(emailUser, password);
            if (!find)
                return res.status(400).json({ message: "Usuário não encontrado" });
            const { _id, firstName, lastName, email, dateOfBirth } = find;
            const token = this.validationToken.generateToken(email, firstName, lastName, dateOfBirth);
            return res.status(200).json({
                message: "Usuário localizado com sucesso",
                user: { _id, firstName, lastName, email, dateOfBirth, token },
            });
        });
        this.read = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const find = yield this.userService.read();
                return res.status(200).json({ users: find });
            }
            catch (error) {
                console.log('error', error);
                return res.status(404).json({ message: error });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const find = yield this.userService.findUser(email);
                if (find) {
                    return res.status(200).json(find);
                }
                const create = yield this.userService.create(req.body);
                const token = this.validationToken.generateToken(email, create.user.firstName, create.user.lastName, create.user.dateOfBirth);
                return res.status(200).json({
                    message: create.message,
                    user: Object.assign(Object.assign({}, create.user), { token })
                });
            }
            catch (error) {
                return res.status(404).json({ message: error });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.body;
            try {
                yield this.userService.update(req.body);
                const find = yield this.userService.findById(_id);
                return res.status(200).json({
                    message: "Dados do Usuário alterados com sucesso",
                    user: find,
                });
            }
            catch (error) {
                return res.status(404).json({ message: error });
            }
        });
        this.remove = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.body;
            try {
                const find = yield this.userService.findById(_id);
                if (find) {
                    yield this.userService.remove(_id);
                    return res.status(200).json({
                        message: "Usuário removido com sucesso!",
                    });
                }
                else {
                    return res.status(200).json({
                        message: "Usuário inexistente",
                    });
                }
            }
            catch (error) {
                return res.status(404).json({ message: error });
            }
        });
        this.userService = new UserService_1.default();
        this.validationToken = new ValidationToken_1.default();
    }
}
exports.default = UserController;
