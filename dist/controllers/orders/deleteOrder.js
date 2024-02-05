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
exports.deleteOrder = void 0;
const ordersService_1 = __importDefault(require("../../services/ordersService"));
const ApiError_1 = require("../../middlewares/errors/ApiError");
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    const foundIndex = yield ordersService_1.default.removeOrder(orderId);
    if (foundIndex === null) {
        next(ApiError_1.ApiError.resourceNotFound('Order not found'));
        return;
    }
    res.status(200).json({ message: 'Order deleted successfully' });
});
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=deleteOrder.js.map