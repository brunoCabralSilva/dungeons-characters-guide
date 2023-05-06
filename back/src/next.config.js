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
Object.defineProperty(exports, "__esModule", { value: true });
const headers = {
    trailingSlash: false,
    headers() {
        return __awaiter(this, void 0, void 0, function* () {
            return [
                {
                    // matching all API routes
                    source: '/:path*',
                    headers: [
                        { key: 'Access-Control-Allow-Credentials', value: 'true' },
                        { key: 'Access-Control-Allow-Origin', value: '*' },
                        { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
                        { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
                    ],
                },
            ];
        });
    },
    redirects() {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
};
exports.default = headers;
