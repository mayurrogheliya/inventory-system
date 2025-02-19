import path from 'path';    // handle file paths
import fs from 'fs';    // handle file system operations
import CustomerDetails from "../models/customer.model.js";
import { Op } from 'sequelize'; // sequelize operators for querying the database

// function to add new customer
const addCustomer = async (req, res) => {
    try {

        // file validation to check file type
        if (req.fileValidationError) {
            console.error(req.fileValidationError);
            return res.status(400).json({ message: req.fileValidationError });
        }

        const { name, email, phone, country, state, city, pincode, occupation, dob, gender, address } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required." });
        }

        const imagePath = req.file ? `images/${req.file.filename}` : "";

        // Store NULL in the database for empty email or phone to avoid uniqueness constraint issues
        const emailToStore = email ? email : null;
        const phoneToStore = phone ? phone : null;

        // create a new customer record in the database
        const newCustomer = await CustomerDetails.create({
            name,
            email: emailToStore,
            phone: phoneToStore,
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

        // Send success response
        res.status(201).json({
            message: "Customer added successfully",
            data: newCustomer,
        });
    } catch (error) {
        // Check if the error is a Sequelize validation error
        if (error.name === "SequelizeUniqueConstraintError") {
            // Handle unique constraint errors for email or phone
            const field = error.errors[0].path;
            res.status(400).json({
                message: `The ${field} is already in use.`,
            });
        } else if (error.name === "SequelizeValidationError") {
            // Handle validation errors (e.g., required fields)
            const errors = error.errors.map((err) => err.message);
            res.status(400).json({
                message: "Validation error",
                errors,
            });
        } else {
            // Handle all other errors
            res.status(500).json({
                message: "An unexpected error occurred",
                error: error.message,
            });
        }
    }
};

// function to get customers with pagination
const getCustomers = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;  // extract pagination parameters from the query

    try {
        const offset = (page - 1) * limit;  // calculate the offset for pagination

        // fetch the customer with pagination
        const customers = await CustomerDetails.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        const totalPages = Math.ceil(customers.count / limit);  // calculate the total pages

        // Replace `null` fields (like email, phone) with empty strings for better readability
        const modifiedCustomers = customers.rows.map(customer => ({
            ...customer.dataValues,
            email: customer.email || '', 
            phone: customer.phone || '',   
            country: customer.country || '',
            state: customer.state || '',
            city: customer.city || '',
            pincode: customer.pincode || '',
            occupation: customer.occupation || '',
            address: customer.address || '',
        }));

        res.json({
            data: modifiedCustomers,
            currentPage: parseInt(page),
            totalPages,
            totalItems: customers.count,
        });
    } catch (error) {
        console.log("Error while fetching customers:", error);
        res.status(500).json({ message: "Error while fetching customers" });
    }
};

// function to delete customer by id
const deleteCustomer = async (req, res) => {
    try {
        const customer = await CustomerDetails.findByPk(req.params.id); // find customer by primary key

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

        // delete the customer from the database
        await CustomerDetails.destroy({
            where: { id: req.params.id }
        });

        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        console.log("Error while deleting customer:", error);
        res.status(500).json({ message: "Internal server error while deleting customer", error });
    }
};

// function to update customer by id
const updateCustomer = async (req, res) => {
    try {

        // file validation to check file type
        if (req.fileValidationError) {
            console.error(req.fileValidationError);
            return res.status(400).json({ message: req.fileValidationError });
        }

        const { id } = req.params;
        const { name, email, phone, country, state, city, pincode, occupation, dob, gender, address } = req.body;

        // Check if the customer exists
        const customer = await CustomerDetails.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found." });
        }

        // Set image path if a new file is uploaded
        const imagePath = req.file ? `images/${req.file.filename}` : customer.image;

        // Prepare updated fields, storing NULL if email or phone is empty
        const updatedData = {
            name: name || customer.name,
            email: email ? email : null,
            phone: phone ? phone : null,
            country: country || customer.country,
            state: state || customer.state,
            city: city || customer.city,
            pincode: pincode || customer.pincode,
            occupation: occupation || customer.occupation,
            dob: dob || customer.dob,
            gender: gender || customer.gender,
            address: address || customer.address,
            image: imagePath,
        };

        // Update customer with new data
        await customer.update(updatedData);

        // Send success response
        res.status(200).json({
            message: "Customer updated successfully",
            data: customer,
        });
    } catch (error) {
        // Handle unique constraint errors
        if (error.name === "SequelizeUniqueConstraintError") {
            const field = error.errors[0].path;
            res.status(400).json({
                message: `The ${field} is already in use.`,
            });
        } else if (error.name === "SequelizeValidationError") {
            const errors = error.errors.map((err) => err.message);
            res.status(400).json({
                message: "Validation error",
                errors,
            });
        } else {
            // Handle all other errors
            res.status(500).json({
                message: "An unexpected error occurred",
                error: error.message,
            });
        }
    }
};

// function to search customer based on name or status
const searchCustomer = async (req, res) => {
    const searchTerm = req.query.q; // extract the search term from the query

    try {
        const results = await CustomerDetails.findAll({
            where: {
                // search categories using Sequelize's `Op` for case-insensitive matching.
                [Op.or]: [
                    // search by name, email, phone, country, state, city, pincode, address, occupation, gender
                    { name: { [Op.like]: `%${searchTerm}%` } },
                    { email: { [Op.like]: `%${searchTerm}%` } },
                    { phone: { [Op.like]: `%${searchTerm}%` } },
                    { country: { [Op.like]: `%${searchTerm}%` } },
                    { state: { [Op.like]: `%${searchTerm}%` } },
                    { city: { [Op.like]: `%${searchTerm}%` } },
                    { pincode: { [Op.like]: `%${searchTerm}%` } },
                    { address: { [Op.like]: `%${searchTerm}%` } },
                    { occupation: { [Op.like]: `%${searchTerm}%` } },
                    { gender: { [Op.like]: `%${searchTerm}%` } }
                ]
            },
        });

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { addCustomer, getCustomers, deleteCustomer, updateCustomer, searchCustomer };