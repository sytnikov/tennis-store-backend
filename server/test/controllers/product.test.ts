import request from "supertest";

import ProductRepo from "../../models/ProductModel";
import CategoryRepo from "../../models/CategoryModel";

import connect, { MongoHelper } from "../db-helper";
import app from "../../..";
import { CreateProductInput, ProductDocument } from "Product";
import { Category } from "Category";
import { authenticateUser } from "../auth/authenticateUser";

describe("Product controller", () => {
  let mongoHelper: MongoHelper;
  let category: Category;
  let productOne: ProductDocument;
  let accessToken: string;

  beforeEach(async () => {
    accessToken = await authenticateUser();
    const categoryInstance = new CategoryRepo({
      name: "Equipment",
      images: ["test image"],
    });
    category = await categoryInstance.save();
    const racketProduct = new ProductRepo({
      name: "Babolat Pure",
      description: "Rafael Nadal's racket",
      price: 300,
      categoryId: category._id.toString(),
      images: ["test image"],
      stock: 12,
    });
    productOne = await racketProduct.save();
  });
  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("Should create a product", async () => {
    const product: CreateProductInput = {
      name: "Babolat Pure",
      description: "Rafael Nadal's racket",
      price: 300,
      categoryId: category._id.toString(),
      images: ["test image"],
      stock: 12,
    };
    const response = await request(app)
    .post("/products")
    .send(product)
    .set("Authorization", `Bearer ${accessToken}`);
    expect(response.body).toHaveProperty("name");
    expect(response.body.price).toEqual(300);
  });

  it("should return all products ", async () => {
    const response = await request(app).get("/products");
    expect(response.body.length).toEqual(1);
    expect(response.body[0].name).toEqual("Babolat Pure");
  });

  it("should return one product ", async () => {
    const response = await request(app).get(`/products/${productOne?._id}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual("Babolat Pure");
  });

  it("should delete one product ", async () => {
    const response = await request(app)
    .delete(`/products/${productOne?._id}`)
    .set("Authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(productOne._id.toString());
  });

  it("should update one product ", async () => {
    const response = await request(app)
      .put(`/products/${productOne?._id}`)
      .send({
        name: "sony",
        price: 300,
      })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual("sony");
    expect(response.body.price).toEqual(300);
  });
});
