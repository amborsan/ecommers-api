import { Router } from "express";
import {
  addProducts,
  getProducts,
  getProductyId,
} from "../controllers/products.js";

const router = Router();

router.post("/", addProducts);
router.get("/", getProducts);
router.get("/:id", getProductyId);

export default router;
