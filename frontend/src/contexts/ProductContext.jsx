/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
    });

    const getProducts = async (page = 1, limit = 5) => {
        try {
            const response = await axios.get(`/api/product/getProducts?page=${page}&limit=${limit}`);
            setProducts(response.data.data);
            setPagination({
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages,
                totalItems: response.data.totalItems
            });
            console.log("Products retrieved successfully:", response.data);
        } catch (error) {
            console.log("Error while getting products: ", error);
        }
    }

    const addProduct = async (ProductItems) => {
        try {
            const response = await axios.post("/api/product/addProduct", ProductItems, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            getProducts();
            console.log("Product added successfully: ", response.data);
            toast.success("Product added successfully")
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                console.log("Error while creating product: ", error.response.data.message);
            } else {
                toast.error("An unexpected error occurred");
                console.log("Error while creating product: ", error);
            }
        }
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`/api/product/deleteProduct/${id}`);
            getProducts();
            console.log("Product deleted successfully");
            toast.success("Product deleted successfully");
        } catch (error) {
            console.log("Product deleted failed: ", error);
            toast.error("Error while deleting product");
        }
    }

    const updateProduct = async (id, productItems) => {
        try {
            await axios.put(`/api/product/updateProduct/${id}`, productItems);
            getProducts();
            console.log("Product updated successfully");
            toast.success("Product updated successfully");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                console.log("Error while updating product: ", error.response.data.message);
            } else {
                toast.error("An unexpected error occurred");
                console.log("Error while updating product: ", error);
            }
        }
    }

    const searchProduct = async (item) => {
        try {
            if (!(item.trim() === "")) {
                const response = await axios.get(`/api/product/searchProduct/?q=${item}`);
                setProducts(response.data);
            }
        } catch (error) {
            console.log("Error while searching product: ", error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <ProductContext.Provider value={{ products, getProducts, addProduct, deleteProduct, updateProduct, searchProduct, pagination }}>
            {children}
        </ProductContext.Provider>
    )
}