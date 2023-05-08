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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
dotenv.config();
class ValidationToken {
    constructor() {
        this.generateToken = (email, firstName, lastName, dateOfBirth) => {
            this.payload = { email, firstName, lastName, dateOfBirth };
            const json = jsonwebtoken_1.default.sign(this.payload, this.jwtSecret, this.jwtConfig);
            return json;
        };
        this.verify = (token) => {
            try {
                const ver = jsonwebtoken_1.default.verify(token, this.jwtSecret);
                if (ver) {
                    return true;
                }
                return false;
            }
            catch (error) {
                return false;
            }
        };
        this.decode = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ver = (0, jwt_decode_1.default)(token);
                return {
                    firstName: ver.firstName,
                    lastName: ver.lastName,
                    dateOfBirth: ver.dateOfBirth,
                    email: ver.email,
                };
            }
            catch (error) {
                return {
                    firstName: '',
                    lastName: '',
                    dateOfBirth: '',
                    email: '',
                };
            }
        });
        this.jwtConfig = {
            expiresIn: '120min',
            subject: '1',
        };
        this.payload = {
            email: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
        };
        this.jwtSecret = process.env.JWT_SECRET || 'Isopotametemumdomsani618';
    }
}
exports.default = ValidationToken;
;
