"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    totalAmount: Number,
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = mongoose_1.default.model("Order", orderSchema);
//# sourceMappingURL=OrderModel.js.map