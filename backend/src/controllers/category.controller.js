import CategoryDetail from "../models/category.model.js";
import path from 'path';
import fs from 'fs';
import { Op } from "sequelize";

const addCategory = async (req, res) => {
    try {
        if (req.fileValidationError) {
            console.error(req.fileValidationError);
            return res.status(400).json({ message: req.fileValidationError });
        }

        const { name, status } = req.body;

        console.log(req.body);

        const imagePath = req.file ? `images/${req.file.filename}` : "";

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

const getCategory = async (req, res) => {

    const { page = 1, limit = 5 } = req.query;

    try {
        const offset = (page - 1) * limit;

        const categorys = await CategoryDetail.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        const totalPages = Math.ceil(categorys.count / limit)

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

const deleteCategory = async (req, res) => {
    try {

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


        const deleteCategory = await CategoryDetail.destroy({
            where: {
                id: req.params.id,
            },
        })
        res.status(200).json({ message: "Category deleted successfully" });
        console.log(deleteCategory);
        console.log(`category with id ${req.params.id} deleted successfully`);

    } catch (error) {
        console.log("Error while deleting category: ", error);
        res.status(500).json({ message: "internal server error while deleting category", error });
    }
}

const updateCategory = async (req, res) => {
    try {
        if (req.fileValidationError) {
            console.error(req.fileValidationError);
            return res.status(400).json({ message: req.fileValidationError });
        }

        // Find the category first to ensure it exists
        const category = await CategoryDetail.findByPk(req.params.id);

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
        }

        let newImagePath = category.image;

        if (req.file) {
            newImagePath = `images/${req.file.filename}`;

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

const searchCategory = async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const results = await CategoryDetail.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${searchTerm}%`,
                        },
                    },
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