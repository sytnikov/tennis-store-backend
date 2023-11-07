import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      productId: Number,
      quantity: Number,
    },
    {
      versionKey: false,
    },
  ],
});

export default mongoose.model('orders', orderSchema);
