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
exports.getSingleUser = void 0;
const ApiError_1 = require("../../middlewares/errors/ApiError");
const usersService_1 = __importDefault(require("../../services/usersService"));
function getSingleUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.userId;
            const user = yield usersService_1.default.getSingleUser(id);
            if (!user) {
                next(ApiError_1.ApiError.resourceNotFound("User not found"));
                return;
            }
            res.status(200).json({ user });
        }
        catch (error) {
            next(ApiError_1.ApiError.resourceNotFound("Cannot find single user"));
        }
    });
}
exports.getSingleUser = getSingleUser;
//# sourceMappingURL=getSingleUser.js.map