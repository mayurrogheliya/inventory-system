/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {

    const [categorys, setCategorys] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
    });

    const getCategoryies = async (page = 1, limit = 5) => {
        try {
            const response = await axios.get(`/api/categories/getCategory?page=${page}&limit=${limit}`);
            console.log("Categories fetched successfully: ", response.data);
            setCategorys(response.data.data);
            setPagination({
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages,
                totalItems: response.data.totalItems
            });
        } catch (error) {
            console.log("Error while fetching categories: ", error);
        }
    }

    const addCategories = async (CategoryItems) => {
        try {
            const response = await axios.post("/api/categories/addCategory", CategoryItems, {
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
            await axios.delete(`/api/categories/deleteCategory/${id}`);
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
            await axios.put(`/api/categories/updateCategory/${id}`, categorysItem);
            getCategoryies();
            console.log("Category updated successfully");
            toast.success("Category updated successfully");
        } catch (error) {
            console.log("Error while updating category: ", error);
            toast.error("Error while updating category");
        }
    }

    const searchCategory = async (item) => {
        try {
            if (!(item.trim() === "")) {
                const response = await axios.get(`/api/categories/searchCategory/?q=${item}`);
                setCategorys(response.data);
            }
        } catch (error) {
            console.log("Error while searching category: ", error);
        }
    }

    useEffect(() => {
        getCategoryies();
    }, []);

    return (
        <CategoryContext.Provider value={{ categorys, setCategorys, getCategoryies, addCategories, deleteCategory, updateCategory, searchCategory, pagination }}>
            {children}
        </CategoryContext.Provider>
    );
}