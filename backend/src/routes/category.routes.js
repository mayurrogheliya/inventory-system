import { Router } from "express";
import { addCategory, deleteCategory, getCategory, updateCategory } from "../controllers/category.controller.js";
import { upoload } from "../middlewares/multer.middleware.js";

const router = Router();

// create a new category
router.route('/addCategory').post(upoload, addCategory);

// get category
router.route('/getCategory').get(getCategory);

// delete category
router.route('/deleteCategory/:id').delete(deleteCategory);

// edit category
router.route('/updateCategory/:id').put(upoload, updateCategory);

export default router;