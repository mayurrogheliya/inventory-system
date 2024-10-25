import { Router } from "express";
import { addProduct, deleteProduct, getProducts, searchProduct, updateProduct } from "../controllers/product.controller.js";
import { upoload } from "../middlewares/multer.middleware.js";

const productRoutes = Router();

// add product
productRoutes.route("/addProduct").post(upoload, addProduct);

// get products
productRoutes.route("/getProducts").get(getProducts);

// delete Product
productRoutes.route("/deleteProduct/:id").delete(deleteProduct);

// update product
productRoutes.route("/updateProduct/:id").put(upoload, updateProduct);

// search product
productRoutes.route("/searchProduct").get(searchProduct);

export default productRoutes;