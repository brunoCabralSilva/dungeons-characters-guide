"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const userModel_1 = __importDefault(require("../model/userModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const md5_1 = __importDefault(require("md5"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class UserService {
    findUser(emailUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield userModel_1.default.findOne({ emailUser });
            if (!find)
                return false;
            const { _id, firstName, lastName, email, dateOfBirth } = find;
            return { _id, firstName, lastName, email, dateOfBirth };
        });
    }
    ;
    sendEmail(email, tokenReset) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = nodemailer_1.default.createTransport({
                host: process.env.SMTP,
                port: process.env.PORT,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });
            yield connection.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Alteração de senha do D&D Character Guide",
                text: `a solicitação para alterar a sua senha. Utilize o código ${tokenReset} `
            });
        });
    }
    ;
    resetPassword(email, tokenReset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatePassword = yield userModel_1.default.updateOne({ email: email }, { $set: { "password": (0, md5_1.default)(tokenReset) } });
                this.sendEmail(email, tokenReset);
                return updatePassword.modifiedCount === 1;
            }
            catch (error) {
                return false;
            }
        });
    }
    login(emailUser, passwordUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield userModel_1.default.findOne({ email: emailUser, password: (0, md5_1.default)(passwordUser) });
            if (!find)
                return false;
            const { _id, firstName, lastName, email, dateOfBirth } = find;
            return { _id, firstName, lastName, email, dateOfBirth };
        });
    }
    ;
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield userModel_1.default.findOne({ email: email });
            if (!find)
                return false;
            return true;
        });
    }
    ;
    findById(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield userModel_1.default.findOne({ _id: idUser });
            if (!find)
                return false;
            const { _id, firstName, lastName, email, dateOfBirth } = find;
            return { _id, firstName, lastName, email, dateOfBirth };
        });
    }
    ;
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield userModel_1.default.find();
            if (find.length > 0) {
                const listOfUsers = find.map((user) => {
                    const { _id, firstName, lastName, email, dateOfBirth } = user;
                    return {
                        _id,
                        firstName,
                        lastName,
                        email,
                        dateOfBirth,
                    };
                });
                return listOfUsers;
            }
            return [];
        });
    }
    ;
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password, dateOfBirth } = user;
            const find = yield userModel_1.default.findOne({ email });
            if (find) {
                const { _id, firstName, lastName, email, dateOfBirth } = find;
                return {
                    message: "Já existe um usuário cadastrado com este nome",
                    user: { _id, firstName, lastName, email, dateOfBirth },
                };
            }
            const create = yield userModel_1.default.create({ firstName, lastName, email, password: (0, md5_1.default)(password), dateOfBirth });
            return {
                message: "Novo Usuário Cadastrado com sucesso",
                user: {
                    _id: create._id,
                    firstName: create.firstName,
                    lastName: create.lastName,
                    email: create.email,
                    dateOfBirth: create.dateOfBirth,
                },
            };
        });
    }
    ;
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id: idUser, firstName, lastName, email, password, dateOfBirth } = user;
            yield userModel_1.default.updateOne({ _id: idUser }, { $set: { firstName, lastName, email, password, dateOfBirth } });
            const find = yield userModel_1.default.findOne({ _id: idUser });
            return {
                message: "Usuário alterado com sucesso",
                user: find,
            };
        });
    }
    ;
    remove(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userModel_1.default.deleteOne({ _id: _id });
        });
    }
}
exports.default = UserService;
