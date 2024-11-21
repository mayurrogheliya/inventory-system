import CategoryDetail from "../models/category.model.js";
import path from 'path';    // handle file paths
import fs from 'fs';    // handle file system operations
import { Op } from "sequelize";     // sequelize operators for querying the database

// function to add new category
const addCategory = async (req, res) => {
    try {

        // file validation to check file type
        if (req.fileValidationError) {
            console.error(req.fileValidationError);
            return res.status(400).json({ message: req.fileValidationError });
        }

        const { name, status } = req.body;

        // set the image path if file is uploaded
        const imagePath = req.file ? `images/${req.file.filename}` : "";

        // create a new category in the database
        const newCategory = await CategoryDetail.create({
            name: name,
            image: imagePath,
            status: status,
        });
        res.json(newCategory);
    } catch (error) {
        console.log("Error creating category: ", error);
        res.status(500).json({ message: "Error creating category" });
    }
}

// function to get categories with pagination
const getCategory = async (req, res) => {

    const { page = 1, limit = 5 } = req.query;  // extract pagination parameters from the query

    try {
        const offset = (page - 1) * limit;  // calculate the offset for pagination

        // fetch the categories with pagination
        const categorys = await CategoryDetail.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        const totalPages = Math.ceil(categorys.count / limit)   // calculate the total pages

        res.json({
            data: categorys.rows,
            currentPage: parseInt(page),
            totalPages,
            totalItems: categorys.count,
        });
    } catch (error) {
        console.log("Error while fetching category: ", error);
        res.status(500).json({ message: "Error while fetching category" });
    }
}

// function to delete category by id
const deleteCategory = async (req, res) => {
    try {
        // find the category by primary key 
        const category = await CategoryDetail.findByPk(req.params.id);

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
        }

        // delete the image file if exists
        if (category.image) {
            const imagePath = path.join(process.cwd(), 'public', category.image);

            fs.unlink(imagePath, function (err) {
                if (err) {
                    console.error("Error deleting image file: ", err);
                } else {
                    console.error(`Image file ${imagePath} deleted successfully`);
                }
            });
        }

        // delete the category from the database
        const deleteCategory = await CategoryDetail.destroy({
            where: {
                id: req.params.id,
            },
        })

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.log("Error while deleting category: ", error);
        res.status(500).json({ message: "internal server error while deleting category", error });
    }
}

// function to update category by id
const updateCategory = async (req, res) => {
    try {

        // file validation to check file type
        if (req.fileValidationError) {
            console.error(req.fileValidationError);
            return res.status(400).json({ message: req.fileValidationError });
        }

        // find the category first to ensure it exists
        const category = await CategoryDetail.findByPk(req.params.id);

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
        }

        let newImagePath = category.image;  // use the existing image path by default

        if (req.file) {
            newImagePath = `images/${req.file.filename}`;   // update existing image path with the new image path

            // delete the old image if it exists 
            if (category.image) {
                const oldImagePath = path.join(process.cwd(), 'public', category.image);

                fs.unlink(oldImagePath, function (err) {
                    if (err) {
                        console.error("Error deleting image file: ", err);
                    } else {
                        console.error(`Image file ${oldImagePath} deleted successfully`);
                    }
                });
            }
        }

        // Prepare updated data
        const updatedData = {
            name: req.body.name || category.name,
            status: req.body.status || category.status,
            image: newImagePath,
        };

        // Update the category with the new data
        await category.update(updatedData);

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        console.error("Error while updating category: ", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

// function to search categories based on name or status
const searchCategory = async (req, res) => {
    const searchTerm = req.query.q; // extract the search term from the query

    try {
        // search categories using Sequelize's `Op` for case-insensitive matching.
        const results = await CategoryDetail.findAll({
            where: {
                [Op.or]: [
                    // search by category name
                    {
                        name: {
                            [Op.like]: `%${searchTerm}%`,
                        },
                    },
                    // search by category status
                    {
                        status: {
                            [Op.like]: `%${searchTerm}%`,
                        },
                    }
                ]
            },
        });

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export { addCategory, getCategory, deleteCategory, updateCategory, searchCategory };