import { Router } from "express";
import { CustomerReport, OrderReport } from "../controllers/report.controller.js";

const reportRoute = Router();

// customer report
reportRoute.route('/customer-report/:customerId?').get(CustomerReport);

// order report
reportRoute.route('/order-report').get(OrderReport);

export default reportRoute;