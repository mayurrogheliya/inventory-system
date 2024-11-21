import { DataTypes, Op } from "sequelize";
import sequelize from "../db/dbConfig.js";  // database configuration
import Order from "./order.model.js";   // import order model for associations

// define the CustomerDetails model
const CustomerDetails = sequelize.define(
    "CustomerDetails",  // name of the model, which are corresponds to the database table
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pincode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female', 'Other'),
            allowNull: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        // Indexes are created to ensure unique values for email and phone where they are not null
        indexes: [
            {
                unique: true,
                fields: ["email"],
                where: {
                    email: {
                        [Op.ne]: null, // Uniqueness only if email is not null
                    },
                },
            },
            {
                unique: true,
                fields: ["phone"],
                where: {
                    phone: {
                        [Op.ne]: null, // Uniqueness only if phone is not null
                    },
                },
            },
        ],
    }
);

// define association: A customer can have many orders
CustomerDetails.hasMany(Order, { foreignKey: 'customerId' });

export default CustomerDetails;
