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
exports.deleteProduct = void 0;
const productsService_1 = __importDefault(require("../../services/productsService"));
const ApiError_1 = require("../../middlewares/errors/ApiError");
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.productId;
    const deletedProduct = yield productsService_1.default.removeOne(id);
    if (deletedProduct === null) {
        next(ApiError_1.ApiError.resourceNotFound("Product id is not found"));
        return;
    }
    res.status(200).json(deletedProduct._id);
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=deleteProduct.js.map