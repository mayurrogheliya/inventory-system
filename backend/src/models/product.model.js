import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const ProductDetail = sequelize.define(
    "ProductDetail",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Active', 'Inactive'),
            defaultValue: 'Active',
        },
        weight: {
            type: DataTypes.FLOAT,
        },
        image: {
            type: DataTypes.STRING,
        }
    }
)

export default ProductDetail;