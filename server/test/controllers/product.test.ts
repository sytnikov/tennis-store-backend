import request from "supertest";

import ProductService from "../../services/productsService";
import ProductRepo from "../../models/ProductModel";
import CategoryRepo from "../../models/CategoryModel";
import connect, { MongoHelper } from "../db-hepper";
import app from "../../app";
import { CreateProductInput, Product } from "Product";
import { Category } from "Category";

describe("Product controller", () => {
  let mongoHelper: MongoHelper;
  let category: Category;
  beforeEach(async () => {
    const categoryInstance = new CategoryRepo({
      name: "mobile",
      images: ["fdfgdf"],
    });
    category = await categoryInstance.save();
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
      name: "nokia",
      description: "nokia description",
      price: 300,
      categoryId: category._id.toString(),
      images: ["fdfgdf"],
      stock: 12
    };
    const response = await request(app).post("/products").send(product);
    expect(response.body.product).toHaveProperty("name");
    expect(response.body.message).toEqual("Product successfully created");
  });

  it("should return all products ", async () => {
    const product: CreateProductInput = {
      name: "nokia",
      description: "nokia description",
      price: 300,
      categoryId: category._id.toString(),
      images: ["fdfgdf"],
      stock: 12,
    };
    await ProductService.createOne(product);
    const response = await request(app).get("/products");
    expect(response.body.length).toEqual(1);
    expect(response.body[0].name).toEqual("nokia");
  });

  it("should return one product ", async () => {
    const product: CreateProductInput = {
      name: "nokia",
      description: "nokia description",
      price: 300,
      categoryId: category._id.toString(),
      images: ["fdfgdf"],
      stock: 12,
    };
    await ProductService.createOne(product);
    product.name = "iphone";
    const iphoneProduct = await ProductService.createOne(product);
    const response = await request(app).get(`/products/${iphoneProduct?._id}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual("iphone");
  });

  it("should delete one product ", async () => {
    const product: CreateProductInput = {
      name: "sony mobile",
      description: "super phone",
      price: 500,
      categoryId: category._id.toString(),
      images: ["fdfgdf"],
      stock: 15,
    };
    const iphoneProduct = await ProductService.createOne(product);
    const response = await request(app).delete(
      `/products/${iphoneProduct?._id}`
    );
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("Product deleted successfully");
  });

  it("should update one product ", async () => {
    const sonyProduct = new ProductRepo({
      name: "sony",
      description: "super phone",
      price: 500,
      categoryId: category._id.toString(),
      images: ["fdfgdf"],
    });
    await sonyProduct.save();
    const response = await request(app)
      .put(`/products/${sonyProduct?._id}`)
      .send({
        name: "nokia",
        price: 300,
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual("nokia");
    expect(response.body.price).toEqual(300);
  });
});
