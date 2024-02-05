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
exports.register = void 0;
const usersService_1 = __importDefault(require("../../services/usersService"));
const ApiError_1 = require("../../middlewares/errors/ApiError");
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password, roleId } = req.body;
        const user = yield usersService_1.default.register({ name, email, password, roleId });
        if (!user) {
            next(ApiError_1.ApiError.badRequest("User not created"));
            return;
        }
        res.status(201).json(user);
    });
}
exports.register = register;
//# sourceMappingURL=register.js.map