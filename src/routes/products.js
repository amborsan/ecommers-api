import { Router } from "express";
import {addProducts, getProducts} from '../controllers/products.js';
const router = Router();

router.post('/',addProducts);
router.get('/',getProducts);


export default router;
