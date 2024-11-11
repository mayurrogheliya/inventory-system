import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";
import CustomerDetails from "./customer.model.js";
import OrderItem from "./orderItem.model.js";

const Order = sequelize.define(
    'Order',
    {
        customerId: {
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

Order.associate = () => {
    Order.belongsTo(CustomerDetails, {
        foreignKey: 'customerId',
        as: 'CustomerDetails'
    }),
        Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
}

export default Order;