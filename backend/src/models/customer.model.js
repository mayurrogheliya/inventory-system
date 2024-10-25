import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const CustomerDetails = sequelize.define(
    "CustomerDetails",
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
    });

export default CustomerDetails;