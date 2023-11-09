import PaymentRepo from "../models/PaymentModel";

const createOne = async (newPayment) => {
    const product = new PaymentRepo(newPayment);
    return await product.save();

};

const removeOne = async (paymentId: string) => {
  const { deletedCount } = await PaymentRepo.deleteOne({ _id: paymentId });
  return deletedCount === 0 ? false : true;
};


export const findOne = async (paymentId: string) => {
  const product = await PaymentRepo.findById(paymentId);
  return product;
};



export default { createOne, removeOne, findOne };
