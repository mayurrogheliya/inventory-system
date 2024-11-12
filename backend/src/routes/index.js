import { Router } from "express";
import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.routes.js";
import customerRoutes from "./customer.routes.js";
import orderRoutes from "./order.routes.js";
import reportRoute from "./report.routes.js";

const router = Router();

router.use('/categories', categoryRoutes);
router.use('/product', productRoutes);
router.use('/customer', customerRoutes);
router.use('/order', orderRoutes);
router.use('/report', reportRoute);

export default router;