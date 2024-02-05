"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.userSchema = exports.updatedUserBodySchema = exports.userBodySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.userBodySchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(3, { message: "Name must be at least 3 characters long"
    }),
    email: zod_1.z.string({
        required_error: "Email is required",
    }).email(),
    password: zod_1.z.string({
        required_error: "Password is required",
    }).min(6, {
        message: "Password must be at least 6 characters long"
    }),
    roleId: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val)).optional(),
})
    .strict();
exports.updatedUserBodySchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).max(20).optional(),
    roleId: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val)).optional(),
}).partial().strict();
exports.userSchema = zod_1.z.object({
    body: exports.userBodySchema,
});
exports.updateUserSchema = zod_1.z.object({
    body: exports.updatedUserBodySchema,
});
//# sourceMappingURL=userSchema.js.map