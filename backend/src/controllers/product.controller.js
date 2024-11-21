import ProductDetail from "../models/product.model.js";
import path from 'path';    // handle file paths
import fs from 'fs';    // handle file system operations
import { Op } from "sequelize"; // sequelize operators for querying the database

// function to add new product
const addProduct = async (req, res) => {
    try {

        // file validation to check file type
        if (req.fileValidationError) {
            console.error(req.fileValidationError);
            return res.status(400).json({ message: req.fileValidationError });
        }

        const { name, category, price, status, weight } = req.body;

        console.log(req.body);

        const imagePath = req.file ? `images/${req.file.filename}` : "";

        if ([name, category, price].some((field) => field?.trim() === "")) {
            res.status(400).json({ message: "name,category,price is required field" });
        }

        const newProduct = await ProductDetail.create({
            name: name,
            category: category,
            price: price,
            status: status,
            weight: weight,
            image: imagePath,
        });
        res.json(newProduct);

    } catch (error) {
        console.log("Error creating product: ", error);
        res.status(500).json({ message: "Error while creating product" });
    }
}

// function to get products with pagination
const getProducts = async (req, res) => {

    const { page = 1, limit = 5 } = req.query;  // extract pagination parameters from the query

    try {
        const offset = (page - 1) * limit;  // calculate the offset for pagination

        // fetch the products with pagination
        const products = await ProductDetail.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        })

        const totalPages = Math.ceil(products.count / limit) // calculate the total pages

        res.status(200).json({
            data: products.rows,
            currentPage: parseInt(page),
            totalPages,
            totalItems: products.count,
        });
    } catch (error) {
        console.log("Error while getting the products", error);
        res.status(500).json({ message: "Error while fetching product" });
    }
}

// function to delete product by id
const deleteProduct = async (req, res) => {
    try {
        // find the product by primary key
        const product = await ProductDetail.findByPk(req.params.id);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }

        // delete the image file if exists
        if (product.image) {
            const imagePath = path.join(process.cwd(), 'public', product.image);

            fs.unlink(imagePath, function (err) {
                if (err) {
                    console.error("Error deleting product image: ", err);
                } else {
                    console.error(`Successfully deleted product image ${imagePath}`);
                }
            });
        }

        // delete the product from the database
        const deleteProduct = await ProductDetail.destroy({
            where: {
                id: req.params.id,
            }
        });

        res.status(200).json({ message: "Successfully deleted product" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error while deleting product", error });
        console.log("Internal server error while deleting product: ", error);
    }
}

// function to update product by id
const updateProduct = async (req, res) => {
    try {

        // file validation to check file type
        if (req.fileValidationError) {
            console.error(req.fileValidationError);
            return res.status(400).json({ message: req.fileValidationError });
        }

        // find the product first to ensure it exists
        const product = await ProductDetail.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let newImagePath = product.image;   // use the existing image path by default

        if (req.file) {
            newImagePath = `images/${req.file.filename}`;   // update existing image path with the new image path

            // delete the old image if it exists 
            if (product.image) {
                const oldImagePath = path.join(process.cwd(), 'public', product.image);

                fs.unlink(oldImagePath, function (err) {
                    if (err) {
                        console.error("Error deleting product image: ", err);
                    } else {
                        console.error(`Successfully deleted old product image ${oldImagePath}`);
                    }
                });
            }
        }

        const updateData = {
            name: req.body.name || product.name,
            category: req.body.category || product.category,
            price: req.body.price || product.price,
            status: req.body.status || product.status,
            weight: req.body.weight || product.weight,
            image: newImagePath,
        };

        // update product with the new product
        await product.update(updateData);

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Product update failed", error);
        res.status(500).json({ message: "Product update failed", error });
    }
}

// function to search product based on name or status
const searchProduct = async (req, res) => {
    const searchTerm = req.query.q; // extract the search term from the query

    try {
        const results = await ProductDetail.findAll({
            where: {
                // search categories using Sequelize's `Op` for case-insensitive matching.
                [Op.or]: [
                    // search by product name
                    {
                        name: { [Op.like]: `%${searchTerm}%` },
                    },
                    // search by category
                    {
                        category: { [Op.like]: `%${searchTerm}%` },
                    },
                    // search by product status
                    {
                        status: { [Op.like]: `%${searchTerm}%` },
                    },
                ],
            },
        });
        res.json(results);
    } catch (err) {
        console.error("Error searching for product: ", err);
        res.status(500).json({ message: "Error while searching for product" });
    }
}

export { addProduct, getProducts, deleteProduct, updateProduct, searchProduct };