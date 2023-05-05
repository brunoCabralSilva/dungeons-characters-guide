"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const connection_1 = __importDefault(require("./connection/connection"));
const app = (0, express_1.default)();
(0, connection_1.default)();
app.use(express_1.default.json());
app.use('/users', users_1.default);
const PORT = 3333;
app.listen(PORT, () => console.log(`Executando na porta ${PORT}`));
