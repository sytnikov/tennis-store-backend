import request from "supertest";
import connect, { MongoHelper } from "../db-helper";

import app from "../../app";
import UserRepo from "../../models/UserModel";

describe("User controller", () => {
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

    const user = {
        name: "test",
        email: "test@mail.com",
        password: "123456",
    };

    it("Should create a new user", async () => {
        const response = await request(app).post("/users").send(user);
        expect(response.body.newUser).toHaveProperty("name");
        expect(response.body).toMatchObject({ newUser: user });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User successfully created");
    });

    it("Should return a list of users", async () => {
        const response = await request(app).get("/users");
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toMatchObject(user);
        expect(response.status).toBe(200);
    });

    it("Should return one user by id", async () => {
        const newUser = new UserRepo(user);
        await newUser.save();
        const response = await request(app).get(`/users/${newUser._id}`);
        expect(response.body).toMatchObject(user);
        expect(response.status).toBe(200);
    });

    it("Should update a user", async () => {
        const newUser = new UserRepo(user);
        await newUser.save();
        const response = await request(app)
            .put(`/users/${newUser._id}`)
            .send({ name: "updated", email: "updated@mail.com" });
        expect(response.body.name).toEqual("updated");
        expect(response.body.email).toEqual("updated@mail.com");
        expect(response.status).toBe(200);
    });

    it("Should delete a user", async () => {
        const newUser = new UserRepo(user);
        await newUser.save();
        const response = await request(app).delete(`/users/${newUser._id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User successfully deleted");
    });
});


