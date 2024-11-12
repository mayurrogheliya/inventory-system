import CustomerDetails from '../models/customer.model.js';
import Order from '../models/order.model.js';
import OrderItem from '../models/orderItem.model.js';
import ProductDetail from '../models/product.model.js'

const createOrder = async (req, res) => {
    const { customerId, items } = req.body; // items = [{ productId, quantity, price (optional) }]

    try {

        // Check if customer exists
        const customer = await CustomerDetails.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Calculate total amount
        let totalAmount = 0;
        const orderItems = await Promise.all(
            items.map(async (item) => {
                const product = await ProductDetail.findByPk(item.productId);
                if (!product) {
                    throw new Error(`Product ID ${item.productId} not found`);
                }

                const price = item.price || product.price;

                const itemTotal = price * item.quantity;
                totalAmount += itemTotal;

                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price,
                };
            })
        );

        // Create order
        const order = await Order.create({
            customerId,
            totalAmount,
        });

        // Add order items
        await OrderItem.bulkCreate(
            orderItems.map((item) => ({ ...item, orderId: order.id }))
        );

        const orderDetails = await Order.findOne({
            where: { id: order.id },
            include: [
                {
                    model: CustomerDetails,
                    as: 'CustomerDetails',
                    attributes: ['name', 'email', 'phone', 'address']
                },
                {
                    model: OrderItem,
                    as: 'OrderItems',
                    include: [
                        {
                            model: ProductDetail,
                            as: 'ProductDetails',
                            attributes: ['name', 'price', 'weight']
                        }
                    ]
                }
            ]
        });

        const responseData = {
            orderId: orderDetails.id,
            customer: orderDetails.CustomerDetails,
            items: orderDetails.OrderItems.map(item => {

                const initialPrice = item.ProductDetails.price;
                const currentPrice = item.price;
                const price = currentPrice || initialPrice;

                return {
                    productId: item.productId,
                    productName: item.ProductDetails.name,
                    initialPrice,
                    currentPrice,
                    quantity: item.quantity,
                    totalPrice: item.quantity * price,
                }
            }),
            totalAmount: orderDetails.totalAmount,
            status: orderDetails.status,
            orderDate: orderDetails.orderDate,
        }

        res.status(201).json({ message: 'Order created successfully', order: responseData });
    } catch (error) {
        console.error("Error creating order: ", error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
}

const getOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        let orders;
        if (orderId) {
            // Fetch a single order by ID
            orders = await Order.findOne({
                where: { id: orderId },
                include: [
                    {
                        model: CustomerDetails,
                        as: 'CustomerDetails',
                        attributes: ['name', 'email', 'phone', 'address']
                    },
                    {
                        model: OrderItem,
                        as: 'OrderItems',
                        include: [
                            {
                                model: ProductDetail,
                                as: 'ProductDetails',
                                attributes: ['name', 'price', 'weight']
                            }
                        ]
                    }
                ]
            });

            if (!orders) {
                return res.status(404).json({ message: 'Order not found' });
            }

            return res.status(200).json({
                orderId: orders.id,
                customer: orders.CustomerDetails,
                items: orders.OrderItems.map(item => {

                    const initialPrice = item.ProductDetails.price;
                    const currentPrice = item.price;
                    const price = currentPrice || initialPrice;

                    return {
                        productId: item.productId,
                        productName: item.ProductDetails.name,
                        initialPrice,
                        currentPrice,
                        quantity: item.quantity,
                        totalPrice: item.quantity * price,
                    }
                }),
                totalAmount: orders.totalAmount,
                status: orders.status,
                orderDate: orders.orderDate
            });
        } else {
            // Fetch multiple orders (all orders)
            orders = await Order.findAll({
                include: [
                    {
                        model: CustomerDetails,
                        as: 'CustomerDetails',
                        attributes: ['name', 'email', 'phone', 'address']
                    },
                    {
                        model: OrderItem,
                        as: 'OrderItems',
                        include: [
                            {
                                model: ProductDetail,
                                as: 'ProductDetails',
                                attributes: ['name', 'price', 'weight']
                            }
                        ]
                    }
                ]
            });

            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: 'No orders found' });
            }

            // Return all orders
            return res.status(200).json(
                orders.map(order => ({
                    orderId: order.id,
                    customer: order.CustomerDetails,
                    items: order.OrderItems.map(item => {
                        const initialPrice = item.ProductDetails.price;
                        const currentPrice = item.price;
                        const price = currentPrice || initialPrice;

                        return {
                            productId: item.productId,
                            productName: item.ProductDetails.name,
                            initialPrice,
                            currentPrice,
                            quantity: item.quantity,
                            totalPrice: item.quantity * price,
                        }
                    }),
                    totalAmount: order.totalAmount,
                    status: order.status,
                    orderDate: order.orderDate
                }))
            );
        }
    } catch (error) {
        console.error("Error fetching order: ", error);
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
}

const deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Find the order with associated items
        const order = await Order.findOne({
            where: { id: orderId },
            include: {
                model: OrderItem,
                as: 'OrderItems',
            },
        });

        // If order doesn't exist, return 404
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Delete associated order items first
        await OrderItem.destroy({
            where: { orderId: order.id },
        });

        // Now delete the order
        await order.destroy();

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error("Error deleting order: ", error);
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
}

const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { items } = req.body; // items = [{ productId, quantity, price (optional) }]

    try {
        // Find the order by ID
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Retrieve existing order items
        const existingOrderItems = await OrderItem.findAll({ where: { orderId } });
        const existingItemsMap = new Map(existingOrderItems.map(item => [item.productId, item]));

        let totalAmount = 0;

        // Update items based on the request data
        for (const item of items) {
            // Find the product details
            const product = await ProductDetail.findByPk(item.productId);
            if (!product) {
                throw new Error(`Product ID ${item.productId} not found`);
            }

            const price = item.price || product.price;
            const itemTotal = price * item.quantity;
            totalAmount += itemTotal;

            if (existingItemsMap.has(item.productId)) {
                // Update existing item
                const existingItem = existingItemsMap.get(item.productId);
                existingItem.quantity = item.quantity;
                existingItem.price = price;
                await existingItem.save();

                // Remove from map to mark as processed
                existingItemsMap.delete(item.productId);
            } else {
                // Add new item to the order
                await OrderItem.create({
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price,
                });
            }
        }

        // Calculate total amount including unmodified items
        for (const item of existingItemsMap.values()) {
            totalAmount += item.price * item.quantity;
        }

        // Update the order's total amount
        order.totalAmount = totalAmount;
        await order.save();

        // Fetch updated order details
        const updatedOrderDetails = await Order.findOne({
            where: { id: order.id },
            include: [
                {
                    model: CustomerDetails,
                    as: 'CustomerDetails',
                    attributes: ['name', 'email', 'phone', 'address']
                },
                {
                    model: OrderItem,
                    as: 'OrderItems',
                    include: [
                        {
                            model: ProductDetail,
                            as: 'ProductDetails',
                            attributes: ['name', 'price', 'weight']
                        }
                    ]
                }
            ]
        });

        const responseData = {
            orderId: updatedOrderDetails.id,
            customer: updatedOrderDetails.CustomerDetails,
            items: updatedOrderDetails.OrderItems.map(item => {

                const initialPrice = item.ProductDetails.price;
                const currentPrice = item.price;

                return {
                    productId: item.productId,
                    productName: item.ProductDetails.name,
                    initialPrice,
                    currentPrice,
                    quantity: item.quantity,
                    totalPrice: item.price * item.quantity,
                }
            }),
            totalAmount: updatedOrderDetails.totalAmount,
            status: updatedOrderDetails.status,
            orderDate: updatedOrderDetails.orderDate,
        };

        res.status(200).json({ message: 'Order updated successfully', order: responseData });
    } catch (error) {
        console.error("Error updating order: ", error);
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};


export { createOrder, getOrder, deleteOrder, updateOrder };