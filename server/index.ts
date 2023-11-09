import express, { Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";

import productsRouter from "./routes/productsRouter";
import categoriesRouter from "./routes/categoriesRouter";
import ordersRouter from "./routes/ordersRouter";
import paymentsRouter from "./routes/paymentsRouter";
import usersRouter from "./routes/usersRouter";
import { loggingMiddleware } from "./middlewares/logging";
import { apiErrorHandler } from "./middlewares/apiErrorHandler";
import { routeNotFound } from "./middlewares/routeNotFound";
import Order from "./models/OrderModel";
import OrderItem from "./models/OrderItemModel";

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURL = process.env.DB_URL as string;
mongoose.connect(mongoURL).then(() => console.log("Connected!"));

app.use("/products", loggingMiddleware, productsRouter);
app.use("/categories", loggingMiddleware, categoriesRouter);
app.use("/orders", loggingMiddleware, ordersRouter);
app.use("/users", loggingMiddleware, usersRouter);
app.use("/payments", loggingMiddleware, paymentsRouter);

app.post("/checkout", async (req: Request, res: Response) => {
  const {
    userId,
    products,
  }: {
    userId: mongoose.Types.ObjectId;
    products: {
      id: mongoose.Types.ObjectId;
      quantity: number;
    }[];
  } = req.body;
  const order = new Order({ userId });
  await order.save();

  const orderId = order._id;

  await Promise.all(
    products.map((product) => {
      const orderItem = new OrderItem({
        orderId,
        productId: product.id,
        quantity: product.quantity,
      });
      orderItem.save();
      console.log("orderItem:", orderItem);
    })
  );

  res.status(201).json({ message: "order is created", order });
});

app.get("/items", async (req: Request, res: Response) => {
  const items = await OrderItem.find().exec();
  res.status(200).json(items);
});

app.use(apiErrorHandler);
app.use(routeNotFound);
app.listen(PORT, () => {
  console.log(`👀 Server is running on localhost:${PORT}`);
});
