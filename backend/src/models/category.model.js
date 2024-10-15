import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const CategoryDetail = sequelize.define(
    "CategoryDetail",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {

            type: DataTypes.ENUM('Active', 'Inactive'),
            defaultValue: 'Inactive',
            allowNull: false,
        }
    }
)

export default CategoryDetail;