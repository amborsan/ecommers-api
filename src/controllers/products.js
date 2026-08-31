
import  productsModel  from "../models/productsModel.js";


//Add new posts controller
export async function addProducts(req, res) {
    try{
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
  })
  res.status(201).json(newProduct);
}catch(error){
res.status(400).json({message: error.message})
  }

};

// Get all products controller
 export async function getProducts (req, res)  {
    try{
const products = await productsModel.find();
res.status(200).json(products);
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

