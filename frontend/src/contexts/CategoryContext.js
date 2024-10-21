import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {

    const [categorys, setCategorys] = useState([]);

    const getCategoryies = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/categories/getCategory");
            console.log("Categories fetched successfully: ", response.data);
            setCategorys(response.data);
        } catch (error) {
            console.log("Error while fetching categories: ", error);
        }
    }

    const addCategories = async (CategoryItems) => {
        try {
            const response = await axios.post("http://localhost:5000/api/categories/addCategory", CategoryItems, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            getCategoryies();
            console.log("Category created successfully: ", response.data);
            toast.success("Category added successfully");
        } catch (error) {
            console.log("Error creating category: ", error);
            toast.error("Error while creating category");
        }
    }

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/categories/deleteCategory/${id}`);
            getCategoryies();
            console.log("Category deleted successfully");
            toast.success("Category deleted successfully");
        } catch (error) {
            console.log("Error while deleting category: ", error);
            toast.error("Error while deleting category");
        }
    };

    const updateCategory = async (id, categorysItem) => {
        try {
            await axios.put(`http://localhost:5000/api/categories/updateCategory/${id}`, categorysItem);
            getCategoryies();
            console.log("Category updated successfully");
            toast.success("Category updated successfully");
        } catch (error) {
            console.log("Error while updating category: ", error);
            toast.error("Error while updating category");
        }
    }

    useEffect(() => {
        getCategoryies();
    }, []);

    return (
        <CategoryContext.Provider value={{ categorys, getCategoryies, addCategories, deleteCategory, updateCategory }}>
            {children}
        </CategoryContext.Provider>
    );

}