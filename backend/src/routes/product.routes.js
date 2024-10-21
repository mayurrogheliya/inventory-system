import { Router } from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import { upoload } from "../middlewares/multer.middleware.js";

const router = Router();

// add product
router.route("/addProduct").post(upoload, addProduct);

// get products
router.route("/getProducts").get(getProducts);

// delete Product
router.route("/deleteProduct/:id").delete(deleteProduct);

// update product
router.route("/updateProduct/:id").put(upoload, updateProduct);

export default router;