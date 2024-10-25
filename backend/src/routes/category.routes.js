import { Router } from "express";
import { addCategory, deleteCategory, getCategory, searchCategory, updateCategory } from "../controllers/category.controller.js";
import { upoload } from "../middlewares/multer.middleware.js";

const categoryRoutes = Router();

// create a new category
categoryRoutes.route('/addCategory').post(upoload, addCategory);

// get category
categoryRoutes.route('/getCategory').get(getCategory);

// delete category
categoryRoutes.route('/deleteCategory/:id').delete(deleteCategory);

// edit category
categoryRoutes.route('/updateCategory/:id').put(upoload, updateCategory);

// search category
categoryRoutes.route('/searchCategory').get(searchCategory)

export default categoryRoutes;