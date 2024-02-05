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
exports.validateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validateUser(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req.body.headers.Authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        let isUserValid;
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            isUserValid = true;
        }
        catch (e) {
            isUserValid = false;
        }
        res.status(200).json(isUserValid);
    });
}
exports.validateUser = validateUser;
//# sourceMappingURL=validateUser.js.map