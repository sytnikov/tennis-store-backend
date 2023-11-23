import mongoose from "mongoose";
import request from "supertest"

import CategoryService from "../../services/categoriesService";
import CategoryRepo from "../../models/CategoryModel"
import connect, { MongoHelper } from "../db-helper";
import app from "../../app"

describe("Categories Controller", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  const category = {
    name: "test",
    images: ["image1", "image2"]
  };

  it("Should create a new category", async () => {
    const response = await request(app).post("/categories").send(category)
    // expect(response.body.newCategory).toHaveProperty("name")
  });

  
  
});
