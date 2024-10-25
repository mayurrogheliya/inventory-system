// controllers/customer.controller.js
import path from 'path';
import fs from 'fs';
import CustomerDetails from "../models/customer.model.js";
import { Op } from 'sequelize';

const addCustomer = async (req, res) => {
    try {
        if (req.fileValidationError) {
            console.error(req.fileValidationError);
            return res.status(400).json({ message: req.fileValidationError });
        }

        const { name, email, phone, country, state, city, pincode, occupation, dob, gender, address } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required." });
        }

        const imagePath = req.file ? `images/${req.file.filename}` : "";

        const newCustomer = await CustomerDetails.create({
            name,
            email,
            phone,
            country,
            state,
            city,
            pincode,
            occupation,
            dob,
            gender,
            address,
            image: imagePath
        });

        res.json(newCustomer);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            const message = error.errors[0].path === 'email'
                ? "Email already exists."
                : "Phone number already exists.";
            return res.status(400).json({ message });
        }
        console.error("Error creating customer:", error);
        res.status(500).json({ message: "Error creating customer" });
    }
};

const getCustomers = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;

    try {
        const offset = (page - 1) * limit;

        const customers = await CustomerDetails.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        const totalPages = Math.ceil(customers.count / limit);

        res.json({
            data: customers.rows,
            currentPage: parseInt(page),
            totalPages,
            totalItems: customers.count,
        });
    } catch (error) {
        console.log("Error while fetching customers:", error);
        res.status(500).json({ message: "Error while fetching customers" });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await CustomerDetails.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Delete the image file if exists
        if (customer.image) {
            const imagePath = path.join(process.cwd(), 'public', customer.image);

            fs.unlink(imagePath, function (err) {
                if (err) {
                    console.error("Error deleting image file:", err);
                } else {
                    console.log(`Image file ${imagePath} deleted successfully`);
                }
            });
        }

        await CustomerDetails.destroy({
            where: { id: req.params.id }
        });

        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        console.log("Error while deleting customer:", error);
        res.status(500).json({ message: "Internal server error while deleting customer", error });
    }
};

const updateCustomer = async (req, res) => {
    try {

        if (req.fileValidationError) {
            console.error(req.fileValidationError);
            return res.status(400).json({ message: req.fileValidationError });
        }

        const customer = await CustomerDetails.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        let newImagePath = customer.image;

        if (req.file) {
            newImagePath = `images/${req.file.filename}`;

            if (customer.image) {
                const oldImagePath = path.join(process.cwd(), 'public', customer.image);

                fs.unlink(oldImagePath, function (err) {
                    if (err) {
                        console.error("Error deleting image file:", err);
                    } else {
                        console.log(`Image file ${oldImagePath} deleted successfully`);
                    }
                });
            }
        }

        // Prepare updated data
        const updatedData = {
            name: req.body.name || customer.name,
            email: req.body.email || customer.email,
            phone: req.body.phone || customer.phone,
            country: req.body.country || customer.country,
            state: req.body.state || customer.state,
            city: req.body.city || customer.city,
            pincode: req.body.pincode || customer.pincode,
            occupation: req.body.occupation || customer.occupation,
            dob: req.body.dob || customer.dob,
            gender: req.body.gender || customer.gender,
            address: req.body.address || customer.address,
            image: newImagePath
        };

        // Update the customer with the new data
        await customer.update(updatedData);

        res.status(200).json({ message: 'Customer updated successfully', customer });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            const message = error.errors[0].path === 'email'
                ? "Email already exists."
                : "Phone number already exists.";
            return res.status(400).json({ message });
        }
        console.error("Error while updating customer:", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const searchCustomer = async (req, res) => {
    const searchTerm = req.query.q;

    try {
        const results = await CustomerDetails.findAll(
            {
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${searchTerm}%` }, },
                        { email: { [Op.like]: `%${searchTerm}%` }, },
                        { phone: { [Op.like]: `%${searchTerm}%` }, },
                        { country: { [Op.like]: `%${searchTerm}%` }, },
                        { state: { [Op.like]: `%${searchTerm}%` }, },
                        { city: { [Op.like]: `%${searchTerm}%` }, },
                        { pincode: { [Op.like]: `%${searchTerm}%` }, },
                        { address: { [Op.like]: `%${searchTerm}%` }, },
                        { occupation: { [Op.like]: `%${searchTerm}%` }, },
                        { gender: { [Op.like]: `%${searchTerm}%` }, },
                    ]
                },
            }
        );

        res.json(results);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { addCustomer, getCustomers, deleteCustomer, updateCustomer, searchCustomer };