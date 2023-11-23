import { ProductDocument } from "Product";
import OrderService from "../../services/ordersService";
import UserService from "../../services/usersService";
import ProductRepo from "../../models/ProductModel";
import PaymentService from "../../services/paymentsService";
import CategoryRepo from "../../models/CategoryModel";
import connect, { MongoHelper } from "../db-hepper";
import { Category } from "Category";
import { newOrderData } from "Order";
import { CreateUserInput } from "../../types/User";
import { createPaymentInput } from "Payment";

describe("Payment service", () => {
  let mongoHelper: MongoHelper;
  let productOne: ProductDocument;
  let category: Category;

  beforeEach(async () => {
    const categoryInstance = new CategoryRepo({
      name: "mobile",
      images: ["fdfgdf"],
    });
    category = await categoryInstance.save();
    const iphoneProduct = new ProductRepo({
      name: "iphone",
      description: "super phone",
      price: 123,
      categoryId: category._id.toString(),
      images: ["fdfgdf"],
      stock: 12,
    });
    productOne = await iphoneProduct.save();
  });
  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("should create a new payment", async () => {
    const bodyUser: CreateUserInput = {
      name: "Sirko",
      email: "te112@gmail.com",
      password: "1234567",
    };
    const user = await UserService.createUser(bodyUser);
    const bodyOrder: newOrderData = {
      userId: user._id.toString(),
      products: [{ productId: productOne._id, quantity: 1 }],
    };
    const order = await OrderService.createOrder(bodyOrder);
    if (!order?._id) {
      return;
    }
    const bodyPayment: createPaymentInput = {
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
    const payment = await PaymentService.createOne(bodyPayment);
    expect(payment?.[0]?.method).toEqual("paypal");
    expect(payment?.[0]?.bankName).toEqual("OTP");
  });

});
