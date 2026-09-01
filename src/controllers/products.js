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
    //next(error);
  }
}

// Add mehreren Products
export async function addMultiProducts(req, res) {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({
        message: "Request body must be a non-empty array of products",
      });
    }

    const newProducts = await productsModel.insertMany(req.body);
    res.status(201).json(newProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
    //  next(error);
  }
}

// Fetch all products
export async function getProducts(req, res) {
  try {
    const products = await productsModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
    // next(error);
  }
}

// Get a single product by ID
export async function getProductyId(req, res) {
  try {
    const foundProduct = await productsModel.findById(req.params.id);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
    //next(error);
  }
}

// Delete products controller
export async function deleteProduct(req, res) {
  try {
    const product = await productsModel.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
    //next(error);
  }
}

// Update selected product（PATCH）
export async function patchProduct(req, res) {
  try {
    const updatedProduct = await productsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
// Update product by ID
export async function updateProduct(req, res) {
  try {
    const updatedProduct = await productsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
