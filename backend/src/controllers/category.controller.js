import CategoryDetail from "../models/category.model.js";

const addCategory = async (req, res) => {
    try {
        const { name, status } = req.body;

        console.log(req.body);

        // Validate that name is present
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        if (!req.file || !req.file.filename) {
            return res.status(400).json({ message: "Image is required" });
        }

        const imagePath = req.file ? req.file.filename : "";

        const newCategory = await CategoryDetail.create({
            name: name,
            image: imagePath,
            status: status,
        });
        res.json(newCategory);
        console.log(newCategory);

    } catch (error) {
        console.log("Error creating category: ", error);
        res.status(500).json(error);
    }
}

const getCategory = async (req, res) => {
    try {
        const categorys = await CategoryDetail.findAll();
        res.json(categorys);
        console.log(categorys);
    } catch (error) {
        console.log("Error while fetching category: ", error);
    }
}

const deleteCategory = async (req, res) => {
    try {
        const deleteCategory = await CategoryDetail.destroy({
            where: {
                id: req.params.id,
            },
        })
        res.json(deleteCategory);
        console.log(deleteCategory);

    } catch (error) {
        console.log("Error while deleting category: ", error);
    }
}

export { addCategory, getCategory, deleteCategory };