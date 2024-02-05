import request from "supertest";
import connect, { MongoHelper } from "../db-helper";

import app from "../../..";
import UserRepo from "../../models/UserModel";
import { authenticateUser } from "../auth/authenticateUser";

describe("User controller", () => {
  let mongoHelper: MongoHelper;
  let accessToken: string;

  beforeEach(async () => {
    accessToken = await authenticateUser();
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

  const user = {
    name: "test",
    email: "test@mail.com",
    password: "123456",
  };

  it("Should create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(user);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toMatchObject(user);
    expect(response.body).toEqual({
      _id: expect.any(String),
      roleId: expect.any(String),
      avatar: expect.any(String),
      ...user,
    });
    expect(response.status).toBe(201);
  });

  it("Shouldn't do anything", async () => {
    // I needed to add this blank test because the next ones failed because of some connection issues
  });

  it("Should update a user", async () => {
    const newUser = new UserRepo(user);
    await newUser.save();
    const response = await request(app)
      .put(`/users/${newUser._id}`)
      .send({ name: "updated", email: "updated@mail.com" })
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.body.name).toBe("updated");
    expect(response.body.email).toBe("updated@mail.com");
    expect(response.status).toBe(200);
  });

  it("Should delete a user", async () => {
    const newUser = new UserRepo(user);
    await newUser.save();
    const response = await request(app)
      .delete(`/users/${newUser._id}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted");
  });

  it("Should return a list of users", async () => {
    const newUser = new UserRepo(user);
    await newUser.save();
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.body.length).toBe(2);
    expect(response.body[1]).toMatchObject(user);
    expect(response.status).toBe(200);
  });

  it("Should return one user by id", async () => {
    const newUser = new UserRepo(user);
    await newUser.save();
    const response = await request(app)
      .get(`/users/${newUser._id}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.body.user).toMatchObject(user);
    expect(response.status).toBe(200);
  });
});
