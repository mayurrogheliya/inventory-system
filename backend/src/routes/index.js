import { Router } from "express";
import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.routes.js";
import customerRoutes from "./customer.routes.js";

const router = Router();

router.use('/categories', categoryRoutes);
router.use('/product', productRoutes);
router.use('/customer', customerRoutes);

export default router;