import CustomerDetails from "../models/customer.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import moment from 'moment';

const CustomerReport = async (req, res) => {
    const { customerId } = req.params;

    try {
        let orders; // variable to store customer data

        if (customerId) {
            // Fetch a single customer report by ID
            orders = await CustomerDetails.findOne({
                where: { id: customerId },
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Order,
                        as: 'Orders',
                        attributes: ['id', 'totalAmount', 'status'] // Only necessary fields
                    }
                ]
            });

            if (!orders) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            // Calculate the total number of orders and total investment
            const totalOrders = orders.length;
            const totalAmountInvested = orders.reduce((acc, order) => acc + parseFloat(order.totalAmount), 0);

            // Return a summarized report for a single customer
            return res.status(200).json({
                customerId: orders.id,
                name: orders.name,
                totalOrders,
                totalAmountInvested
            });
        } else {
            // Fetch all customer reports
            orders = await CustomerDetails.findAll({
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Order,
                        as: 'Orders',
                        attributes: ['id', 'totalAmount', 'status'] // Only necessary fields
                    }
                ]
            });

            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: 'No customers found' });
            }

            // Return summarized data for all customers
            return res.status(200).json(
                orders.map(customer => {
                    // Calculate the total amount invested and the order counts for each customer
                    const totalOrders = customer.Orders.length;
                    const totalAmountInvested = customer.Orders.reduce((acc, order) => acc + parseFloat(order.totalAmount), 0);

                    return {
                        customerId: customer.id,
                        name: customer.name,
                        totalOrders,
                        totalAmountInvested
                    };
                })
            );
        }
    } catch (error) {
        console.error("Error fetching customer report: ", error);
        res.status(500).json({ message: 'Error fetching customer report', error: error.message });
    }
};

const OrderReport = async (req, res) => {
    try {
        // Fetch all orders along with order items
        const orders = await Order.findAll({
            attributes: ['id', 'customerId', 'totalAmount', 'status', 'orderDate'],
            include: [
                {
                    model: OrderItem,
                    as: 'OrderItems',
                    attributes: ['id', 'productId', 'quantity', 'price']
                }
            ]
        });

        // If no orders are found
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        // Calculate total revenue and average order value
        const totalRevenue = orders.reduce((acc, order) => acc + parseFloat(order.totalAmount), 0);
        const totalOrders = orders.length;
        const averageOrderValue = totalRevenue / totalOrders;

        // Group orders by date (day, week, or month) and calculate total revenue
        const groupedByDate = orders.reduce((acc, order) => {
            const formattedDate = moment(order.orderDate).format('YYYY-MM-DD'); // Change the format as needed
            if (!acc[formattedDate]) acc[formattedDate] = 0;
            acc[formattedDate] += parseFloat(order.totalAmount);
            return acc;
        }, {});

        // Group orders by week or month
        const groupedByWeek = orders.reduce((acc, order) => {
            const week = moment(order.orderDate).week(); // Group by week number
            if (!acc[week]) acc[week] = 0;
            acc[week] += parseFloat(order.totalAmount);
            return acc;
        }, {});

        const groupedByMonth = orders.reduce((acc, order) => {
            const month = moment(order.orderDate).format('YYYY-MM'); // Group by month (YYYY-MM)
            if (!acc[month]) acc[month] = 0;
            acc[month] += parseFloat(order.totalAmount);
            return acc;
        }, {});

        // Calculate popular products based on quantity ordered
        const productQuantities = orders.reduce((acc, order) => {
            order.OrderItems.forEach(item => {
                if (!acc[item.productId]) acc[item.productId] = 0;
                acc[item.productId] += item.quantity;
            });
            return acc;
        }, {});

        // Sort products by quantity ordered (descending)
        const popularProducts = Object.entries(productQuantities)
            .map(([productId, quantity]) => ({ productId, quantity }))
            .sort((a, b) => b.quantity - a.quantity);

        // Return the summarized report
        return res.status(200).json({
            totalRevenue,
            totalOrders,
            averageOrderValue,
            groupedByDate,
            groupedByWeek,
            groupedByMonth,
            popularProducts
        });

    } catch (error) {
        console.error("Error generating order report: ", error);
        res.status(500).json({ message: 'Error generating order report', error: error.message });
    }
};

export { CustomerReport, OrderReport }