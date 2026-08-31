import productsModel from "../models/productsModel.js";

// Create a new product
export async function addProducts(req, res) {
  try {
    const {
      name,
      description,
      price,
      discount,
      category,
      variants,
      inStock,
      tages,
      brand,
      images,
    } = req.body;
    const newProduct = await productsModel.create({
      name,
      description,
      price,
      discount,
      category,
      variants,
      inStock,
      tages,
      brand,
      images,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Fetch all products
export async function getProducts(req, res) {
  try {
    const products = await productsModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get a single product by ID
export async function getProductyId(req, res, next) {
  try {
    const foundProduct = await productsModel.findById(req.params.id);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
