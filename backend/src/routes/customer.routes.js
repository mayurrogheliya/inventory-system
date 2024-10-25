// routes/customer.routes.js
import { Router } from "express";
import { addCustomer, getCustomers, deleteCustomer, updateCustomer, searchCustomer } from "../controllers/customer.controller.js";
import { upoload } from "../middlewares/multer.middleware.js";

const customerRoutes = Router();

// create a new customer
customerRoutes.route('/addCustomer').post(upoload, addCustomer);

// get customers
customerRoutes.route('/getCustomers').get(getCustomers);

// delete customer
customerRoutes.route('/deleteCustomer/:id').delete(deleteCustomer);

// edit customer
customerRoutes.route('/updateCustomer/:id').put(upoload, updateCustomer);

// search customer
customerRoutes.route('/searchCustomer').get(searchCustomer);

export default customerRoutes;