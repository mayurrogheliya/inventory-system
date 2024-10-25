// routes/customer.routes.js
import { Router } from "express";
import { addCustomer, getCustomers, deleteCustomer, updateCustomer, searchCustomer } from "../controllers/customer.controller.js";
import { upoload } from "../middlewares/multer.middleware.js";

const router = Router();

// create a new customer
router.route('/addCustomer').post(upoload, addCustomer);

// get customers
router.route('/getCustomers').get(getCustomers);

// delete customer
router.route('/deleteCustomer/:id').delete(deleteCustomer);

// edit customer
router.route('/updateCustomer/:id').put(upoload, updateCustomer);

// search customer
router.route('/searchCustomer').get(searchCustomer);

export default router;