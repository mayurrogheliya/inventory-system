import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";
import CustomerDetails from "./customer.model.js";
import OrderItem from "./orderItem.model.js";

const Order = sequelize.define(
    'Order',
    {
        customerId: {   // Foreign key referencing the CustomerDetails model
            type: DataTypes.INTEGER,
            references: {
                model: 'CustomerDetails',
                key: 'id'
            },
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Pending', 'Processing', 'Completed', 'Cancelled'), // Define possible status values
            defaultValue: 'Pending',
        },
        orderDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }
);

// Associations: Define the relationships between models
Order.associate = () => {
    // order belongs to a customer (one-to-many relationship)
    Order.belongsTo(CustomerDetails, {
        foreignKey: 'customerId',
        as: 'CustomerDetails'
    }),
        // order has many order items(one - to - many relationship)
        Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
        // Cascade delete: if an order is deleted, its related order items are also deleted
}

export default Order;