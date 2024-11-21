import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";
import Order from "./order.model.js";
import ProductDetail from "./product.model.js";

const OrderItem = sequelize.define(
    'OrderItem',
    {
        // foreign key referencing the Order model
        orderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Orders',
                key: 'id'
            },
            allowNull: false
        },
        // foreign key referencing the ProductDetail model
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ProductDetails',
                key: 'id'
            },
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }
);

// Associations: Define the relationships between models
OrderItem.associate = () => {
    OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'Orders' });
    OrderItem.belongsTo(ProductDetail, { foreignKey: 'productId', as: 'ProductDetails' });
};

export default OrderItem;