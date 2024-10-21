/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await axios.get("/api/categories/getProducts");
            setProducts(response.data);
            console.log("Products retrieved successfully:", response.data);
        } catch (error) {
            console.log("Error while getting products: ", error);
        }
    }

    const addProduct = async (ProductItems) => {
        try {
            const response = await axios.post("/api/categories/addProduct", ProductItems, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            getProducts();
            console.log("Product added successfully: ", response.data);
        } catch (error) {
            console.log("Product added failed: ", error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`/api/categories/deleteProduct/${id}`);
            getProducts();
            console.log("Product deleted successfully");
        } catch (error) {
            console.log("Product deleted failed: ", error);
        }
    }

    const updateProduct = async (id, productItems) => {
        try {
            await axios.put(`/api/categories/updateProduct/${id}`, productItems);
            getProducts();
            console.log("Product updated successfully");
        } catch (error) {
            console.log("Error while updating product: ", error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <ProductContext.Provider value={{ products, getProducts, addProduct, deleteProduct, updateProduct }}>
            {children}
        </ProductContext.Provider>
    )
}