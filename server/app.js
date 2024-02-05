import express from "express";
import passport from "passport";
import cors from "cors"

import productsRouter from "./routes/productsRouter";
import categoriesRouter from "./routes/categoriesRouter";
import ordersRouter from "./routes/ordersRouter";
import usersRouter from "./routes/usersRouter";
import checkoutRouter from "./routes/checkoutRouter";
import orderItemsRouter from "./routes/orderItemsRouter";
import { loggingMiddleware } from "./middlewares/logging";
import { apiErrorHandler } from "./middlewares/apiErrorHandler";
import { routeNotFound } from "./middlewares/routeNotFound";
import { authWithGoogle } from "./middlewares/authWithGoogle";

import mongoose from "mongoose";
import "dotenv/config";


const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use(authWithGoogle());

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

app.use("/products", loggingMiddleware, productsRouter);
app.use("/categories", loggingMiddleware, categoriesRouter);
app.use("/orders", loggingMiddleware, ordersRouter);
app.use("/users", loggingMiddleware, usersRouter);
app.use("/checkout", loggingMiddleware, checkoutRouter);
app.use("/items", loggingMiddleware, orderItemsRouter);

app.use(apiErrorHandler);
app.use(routeNotFound);

const port = process.env.PORT || 5000;

const mongoURL = process.env.DB_URL_TENNIS;
mongoose.connect(mongoURL).then(() => console.log("Connected!"));

app.listen(port, () => {
  console.log(`👀 Server is running on localhost:${port}`);
});


export default app