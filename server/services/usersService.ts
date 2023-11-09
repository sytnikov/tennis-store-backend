import mongoose from "mongoose";
import UserRepo from "../models/UserModel";
import { User, UserUpdate } from "../types/User";

async function findAll() {
    const users = await UserRepo.find().exec();
    return users;
}

async function getSingleUser(index: string) {
    const id = new mongoose.Types.ObjectId(index);
    const user = await UserRepo.findById(id).exec();
    return user;
}

async function createUser(user: User) {
    const newUser = new UserRepo(user);
    await newUser.save();
    return newUser;
}

async function updateUser(index: string, user: UserUpdate) {
    const updatedUser = await UserRepo.findOneAndUpdate(
        { _id: index },
        user,
        { new: true }
    );
    return updatedUser;
}

async function deleteUser(index: string) {
    const deletedUser = await UserRepo.findOneAndDelete({ _id: index });
    return deletedUser;
}

export default {
    findAll,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};