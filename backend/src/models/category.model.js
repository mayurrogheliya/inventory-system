import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";  // database configuration

// define the sequelize model for the 'CategoryDetail' table
const CategoryDetail = sequelize.define(
    "CategoryDetail",   // name of the model, which are corresponds to the database table
    {
        name: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        status: {

            type: DataTypes.ENUM('Active', 'Inactive'),
            defaultValue: 'Active',
        }
    }
)

export default CategoryDetail;