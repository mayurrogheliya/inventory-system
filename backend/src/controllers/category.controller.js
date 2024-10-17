import CategoryDetail from "../models/category.model.js";

const addCategory = async (req, res) => {
    try {
        const { name, status } = req.body;

        console.log(req.body);

        const imagePath = req.file ? `images/${req.file.filename}` : "";

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

const updateCategory = async (req, res) => {
    try {
        // Find the category first to ensure it exists
        const category = await CategoryDetail.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Prepare updated data
        const updatedData = {
            name: req.body.name || category.name,
            status: req.body.status || category.status,
            image: req.file ? `images/${req.file.filename}` : category.image // Only update if a new image is provided
        };

        // Update the category with the new data
        await category.update(updatedData);

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        console.error("Error while updating category: ", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};



export { addCategory, getCategory, deleteCategory, updateCategory };