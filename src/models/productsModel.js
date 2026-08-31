import mongoose from "mongoose";

const productsScheme = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    category: { type: String, required: true, trim: true },
    variants: { type: Array, required: false },
    inStock: { type: Boolean },
    tages: { type: Array, required: false },
    brand: { type: String, required: false, trim: true },
    images: { type: Array, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);
// const productsModel = mongoose.model('products',productsScheme, 'products' )
const productsModel = mongoose.model(
  "productsModel",
  productsScheme,
  "products",
);
export default productsModel;
