import { Router } from "express";
import { addCategory, deleteCategory, getCategory } from "../controllers/category.controller.js";
import { upoload } from "../middlewares/multer.middleware.js";

const router = Router();

// create a new category
router.route('/addCategory').post(upoload.single('image'), addCategory);

// get the category
router.route('/getCategory').get(getCategory);

// delete the category
router.route('/deleteCategory/:id').delete(deleteCategory);

export default router;