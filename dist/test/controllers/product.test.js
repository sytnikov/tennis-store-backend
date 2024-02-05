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
const supertest_1 = __importDefault(require("supertest"));
const ProductModel_1 = __importDefault(require("../../models/ProductModel"));
const CategoryModel_1 = __importDefault(require("../../models/CategoryModel"));
const db_helper_1 = __importDefault(require("../db-helper"));
const app_1 = __importDefault(require("../../app"));
const authenticateUser_1 = require("../auth/authenticateUser");
describe("Product controller", () => {
    let mongoHelper;
    let category;
    let productOne;
    let accessToken;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        accessToken = yield (0, authenticateUser_1.authenticateUser)();
        const categoryInstance = new CategoryModel_1.default({
            name: "Equipment",
            images: ["test image"],
        });
        category = yield categoryInstance.save();
        const racketProduct = new ProductModel_1.default({
            name: "Babolat Pure",
            description: "Rafael Nadal's racket",
            price: 300,
            categoryId: category._id.toString(),
            images: ["test image"],
            stock: 12,
        });
        productOne = yield racketProduct.save();
    }));
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoHelper = yield (0, db_helper_1.default)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoHelper.clearDatabase();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoHelper.closeDatabase();
    }));
    it("Should create a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            name: "Babolat Pure",
            description: "Rafael Nadal's racket",
            price: 300,
            categoryId: category._id.toString(),
            images: ["test image"],
            stock: 12,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/products")
            .send(product)
            .set("Authorization", `Bearer ${accessToken}`);
        expect(response.body).toHaveProperty("name");
        expect(response.body.price).toEqual(300);
    }));
    it("should return all products ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/products");
        expect(response.body.length).toEqual(1);
        expect(response.body[0].name).toEqual("Babolat Pure");
    }));
    it("should return one product ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/products/${productOne === null || productOne === void 0 ? void 0 : productOne._id}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.name).toEqual("Babolat Pure");
    }));
    it("should delete one product ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/products/${productOne === null || productOne === void 0 ? void 0 : productOne._id}`)
            .set("Authorization", `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(productOne._id.toString());
    }));
    it("should update one product ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/products/${productOne === null || productOne === void 0 ? void 0 : productOne._id}`)
            .send({
            name: "sony",
            price: 300,
        })
            .set("Authorization", `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.name).toEqual("sony");
        expect(response.body.price).toEqual(300);
    }));
});
//# sourceMappingURL=product.test.js.map