"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("./errors/ApiError");
function checkAuth(req, _, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        next(ApiError_1.ApiError.forbidden("Token is not found"));
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.decoded = decoded;
    }
    catch (e) {
        next(ApiError_1.ApiError.forbidden("Token is not valid"));
        return;
    }
    next();
}
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map