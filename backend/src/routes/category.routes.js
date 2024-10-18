import { Router } from "express";
import { addCategory, deleteCategory, getCategory, updateCategory } from "../controllers/category.controller.js";
import { upoload } from "../middlewares/multer.middleware.js";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router();

// create a new category
router.route('/addCategory').post(upoload.single('image'), addCategory);

// get category
router.route('/getCategory').get(getCategory);

// delete category
router.route('/deleteCategory/:id').delete(deleteCategory);

// edit category
router.route('/updateCategory/:id').put(upoload.single('image'), updateCategory);

// add product
router.route("/addProduct").post(upoload.single('image'), addProduct);

// get products
router.route("/getProducts").get(getProducts);

// delete Product
router.route("/deleteProduct/:id").delete(deleteProduct);

// update product
router.route("/updateProduct/:id").put(upoload.single('image'), updateProduct);

export default router;