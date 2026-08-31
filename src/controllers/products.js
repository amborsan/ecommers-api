
import  productsModel  from "../models/productsModel.js";



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
 export const getProducts = async(req, res) => {
const products = await productsModel.find();
res.status(200).json(products)
}

