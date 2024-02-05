"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createUser_1 = require("./createUser");
const getSingleUser_1 = require("./getSingleUser");
const deleteUser_1 = require("./deleteUser");
const updateUser_1 = require("./updateUser");
const getAllusers_1 = require("./getAllusers");
const register_1 = require("./register");
const logIn_1 = require("./logIn");
const googleLogIn_1 = require("./googleLogIn");
const validateUser_1 = require("./validateUser");
exports.default = {
    createUser: createUser_1.createUser,
    getAllUsers: getAllusers_1.getAllUsers,
    getSingleUser: getSingleUser_1.getSingleUser,
    deleteUser: deleteUser_1.deleteUser,
    updateUser: updateUser_1.updateUser,
    register: register_1.register,
    logIn: logIn_1.logIn,
    googleLogIn: googleLogIn_1.googleLogIn,
    validateUser: validateUser_1.validateUser
};
//# sourceMappingURL=index.js.map