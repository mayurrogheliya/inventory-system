import ProductDetail from "../models/product.model.js";
import path from 'path';
import fs from 'fs';
import { Op } from "sequelize";

const addProduct = async (req, res) => {
    try {
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

const getProducts = async (req, res) => {

    const { page = 1, limit = 5 } = req.query;

    try {

        const offset = (page - 1) * limit;

        const products = await ProductDetail.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        })

        const totalPages = Math.ceil(products.count / limit)

        res.status(200).json({
            data: products.rows,
            currentPage: parseInt(page),
            totalPages,
            totalItems: products.count,
        });
        console.log(products);
    } catch (error) {
        console.log("Error while getting the products", error);
        res.status(500).json({ message: "Error while fetching product" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await ProductDetail.findByPk(req.params.id);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }

        // Delete the product image
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

        const deleteProduct = await ProductDetail.destroy({
            where: {
                id: req.params.id,
            }
        });

        res.status(200).json({ message: "Successfully deleted product" });
        console.log(deleteProduct);
        console.log(`Product with id ${deleteProduct.id} deleted successfully`);
    } catch (error) {
        res.status(500).json({ message: "Internal server error while deleting product", error });
        console.log("Internal server error while deleting product: ", error);
    }
}

const updateProduct = async (req, res) => {
    try {
        if (req.fileValidationError) {
            console.error(req.fileValidationError);
            return res.status(400).json({ message: req.fileValidationError });
        }
        const product = await ProductDetail.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let newImagePath = product.image;

        if (req.file) {
            newImagePath = `images/${req.file.filename}`;

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

        await product.update(updateData);

        res.status(200).json({ message: "Product updated successfully", product });
        console.log(product);
    } catch (error) {
        console.error("Product update failed", error);
        res.status(500).json({ message: "Product update failed", error });
    }
}

const searchProduct = async (req, res) => {
    const searchTerm = req.query.q;

    try {
        const results = await ProductDetail.findAll({
            where: {
                [Op.or]: [
                    {
                        name: { [Op.like]: `%${searchTerm}%` },
                    },
                    {
                        category: { [Op.like]: `%${searchTerm}%` },
                    },
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