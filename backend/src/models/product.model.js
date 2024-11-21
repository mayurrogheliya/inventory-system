import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";  // database configuration

// define the sequelize model for the 'CategoryDetail' table
const ProductDetail = sequelize.define(
    "ProductDetail",    // name of the model, which are corresponds to the database table
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