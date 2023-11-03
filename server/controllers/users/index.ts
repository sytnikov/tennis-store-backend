import { createUser } from "./createUser";
import { getAllUsers } from "./getAllUsers";
import { getSingleUser } from "./getSingleUser";
import { deleteUser } from "./deleteUser";
import { updateUser } from "./updateUser";

export const usersController = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser
}