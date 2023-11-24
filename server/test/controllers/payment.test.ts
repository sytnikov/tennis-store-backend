import request from "supertest";

import app from "../../app";
import { CreateProductInput, ProductDocument } from "Product";
import { Category } from "Category";
import connect, { MongoHelper } from "../db-helper";
import { CreateUserInput } from "User";
import { newOrderData } from "Order";
import OrderService from "../../services/ordersService";
import UserService from "../../services/usersService";
import ProductRepo from "../../models/ProductModel";
import PaymentService from "../../services/paymentsService";
import CategoryRepo from "../../models/CategoryModel";

async function createOrderWithPayment() {
  const categoryInstance = new CategoryRepo({
    name: "mobile",
    images: ["fdfgdf"],
  });
  const category = await categoryInstance.save();
  const iphoneProduct = new ProductRepo({
    name: "iphone",
    description: "super phone",
    price: 123,
    categoryId: category._id.toString(),
    images: ["fdfgdf"],
    stock: 12,
  });
  const productOne = await iphoneProduct.save();

  const bodyUser: CreateUserInput = {
    name: "Sirko",
    email: "te112@gmail.com",
    password: "1234567",
  };
  const user = await UserService.createUser(bodyUser);

  const bodyOrder: newOrderData = {
    userId: user._id.toString(),
    products: [{ productId: productOne._id.toString(), quantity: 1 }],
  };
  const order = await OrderService.createOrder(bodyOrder);

  if (!order?._id) {
    return;
  }

  const bodyPayment = {
    method: "paypal",
    userId: user._id.toString(),
    ordersId: [order._id.toString()],
    bankName: "OTP",
    accountNumber: "sdfdsfdsf",
    shipmentInfo: {
      address: "new Street 1",
      shippingPrice: 10,
      city: "Oulu",
      postalCode: "12412",
      country: "Finland",
    },
  };

  return bodyPayment;
}

describe("Product controller", () => {
  let mongoHelper: MongoHelper;
  let category: Category;
  let productOne: ProductDocument;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("Should create a payment", async () => {
    const bodyPayment = await createOrderWithPayment();
    const response = await request(app).post("/payments").send(bodyPayment);
    expect(response.body.payment[0].bankName).toEqual("OTP");
    expect(response.body.message).toEqual("Payment is created");
    expect(response.body.payment[0].userId).toEqual(bodyPayment?.userId);
  });

  it("Should delete a payment", async () => {
    const bodyPayment = await createOrderWithPayment();
    const response1 = await request(app).post("/payments").send(bodyPayment);
    const payments = await PaymentService.findAll();
    console.log("🚀 ~ file: payment.test.ts:112 ~ it ~ payments:", payments);
    const response = await request(app).post("/payments").send(bodyPayment);
    // expect(response.body.payment[0].bankName).toEqual("OTP");
    // expect(response.body.message).toEqual("Payment is created");
    // expect(response.body.payment[0].userId).toEqual(bodyPayment?.userId);
  });
});
