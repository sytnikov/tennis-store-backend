"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    roleId: {
        type: Schema.Types.ObjectId,
        default: "656f2ef56b3ed7947e2f0a11",
        ref: "Role",
    },
    avatar: {
        type: String,
        default: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
    }
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=UserModel.js.map