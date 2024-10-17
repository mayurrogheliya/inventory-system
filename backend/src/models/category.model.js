import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const CategoryDetail = sequelize.define(
    "CategoryDetail",
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