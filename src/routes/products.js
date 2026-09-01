import { Router } from "express";
import {
  addProducts,
  getProducts,
  getProductyId,
  addMultiProducts,
  deleteProduct,
  patchProduct,
  updateProduct,
} from "../controllers/products.js";

const router = Router();

router.post("/", addProducts);
router.get("/", getProducts);
router.get("/:id", getProductyId);
router.post("/multi", addMultiProducts);
router.delete("/:id", deleteProduct);
router.patch("/:id", patchProduct);
router.put("/:id", updateProduct);

export default router;
