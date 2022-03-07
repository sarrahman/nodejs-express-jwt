import express from "express";
import {
  RegisterApi,
  LoginApi,
  logoutApi,
} from "../controllers/Auth/index.mjs";
import { verifyToken } from "../middleware/verifyToken.mjs";
import {
  addProducts,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/Products.mjs";
import { refreshToken } from "../middleware/refreshToken.mjs";

const router = express.Router();

router.get("/api/products", verifyToken, getProducts);
router.get("/api/product/:id", verifyToken, getProductById);
router.post("/api/product", verifyToken, addProducts);
router.patch("/api/product/:id", verifyToken, updateProduct);
router.delete("/api/product/:id", verifyToken, deleteProduct);

router.post("/api/auth/register", RegisterApi);
router.post("/api/auth/login", LoginApi);
router.get("/api/auth/token", refreshToken);
router.delete("/api/auth/logout", logoutApi);

export default router;
