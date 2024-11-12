import { Router } from "express";
import { createOrder, deleteOrder, getOrder, updateOrder } from "../controllers/order.controller.js";

const orderRoutes = Router();

// create order
orderRoutes.route('/createOrder').post(createOrder);

// get order/s
orderRoutes.route('/getOrder/:orderId?').get(getOrder);

// delete order
orderRoutes.route('/deleteOrder/:orderId').delete(deleteOrder);

// update order
orderRoutes.route('/updateOrder/:orderId').put(updateOrder);

export default orderRoutes;