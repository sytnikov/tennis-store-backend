var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { z } from "zod";
const productSchema = z.object({
    body: z.object({
        id: z.number({
            required_error: "Id is required",
        }),
        name: z.string({
            required_error: "Name is required",
        }),
    }),
});
export function validateProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield productSchema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        }
        catch (error) {
            return res.status(400).json(error);
        }
    });
}
