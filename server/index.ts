import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import productsRouter from "./routes/productsRouter";
import categoriesRouter from "./routes/categoriesRouter";
import ordersRouter from "./routes/ordersRouter";
import usersRouter from "./routes/usersRouter";
import { loggingMiddleware } from "./middlewares/logging";
import { apiErrorHandler } from "./middlewares/apiErrorHandler";
import { routeNotFound } from "./middlewares/routeNotFound";

const PORT = 8080;
const app = express();
const mongoURL = process.env.DB_URL as string;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURL = process.env.DB_URL_COMMON as string;
mongoose.connect(mongoURL).then(() => console.log("Connected!"));

app.use("/products", loggingMiddleware, productsRouter);
app.use("/categories", loggingMiddleware, categoriesRouter);
app.use("/orders", loggingMiddleware, ordersRouter);
app.use("/users", loggingMiddleware, usersRouter);

app.use(apiErrorHandler);
app.use(routeNotFound);
app.listen(PORT, () => {
  console.log(`👀 Server is running on localhost:${PORT}`);
});
mongoose.connect(mongoURL).then(() => console.log("Connected!"));