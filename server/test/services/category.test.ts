import CategoryService from "../../services/categoriesService";
import connect, { MongoHelper } from "../db-hepper";

describe("Category controller", () => {
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

  it("should create a new category", async () => {
    // create new category
    const category = {
      name: "test",
      images: ["dgdfsgvdsv"]
    };
    const newCategory = await CategoryService.createCategory(category);
    expect(newCategory).toHaveProperty("_id");
    expect(newCategory.name).toEqual("test");
  });

  
});
