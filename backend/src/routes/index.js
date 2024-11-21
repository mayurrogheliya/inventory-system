import { Router } from "express";
import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.routes.js";
import customerRoutes from "./customer.routes.js";
import orderRoutes from "./order.routes.js";
import reportRoute from "./report.routes.js";

const router = Router();

// All category-related endpoints start with '/categories'
router.use('/categories', categoryRoutes);

// All product-related endpoints start with '/product'
router.use('/product', productRoutes);

// All customer-related endpoints start with '/customer'
router.use('/customer', customerRoutes);

// All order-related endpoints start with '/order'
router.use('/order', orderRoutes);

// All report-related endpoints start with '/report'
router.use('/report', reportRoute);

export default router;