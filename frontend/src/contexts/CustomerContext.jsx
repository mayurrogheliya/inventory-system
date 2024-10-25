/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
    });

    const getCustomers = async (page = 1, limit = 5) => {
        try {
            const response = await axios.get(`/api/customer/getCustomers?page=${page}&limit=${limit}`);
            console.log("Customers fetched successfully: ", response.data);
            setCustomers(response.data.data);
            setPagination({
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages,
                totalItems: response.data.totalItems
            });
        } catch (error) {
            console.log("Error while fetching customers: ", error);
        }
    };

    const addCustomer = async (customerItems) => {
        try {
            const response = await axios.post("/api/customer/addCustomer", customerItems, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            getCustomers();
            console.log("Customer created successfully: ", response.data);
            toast.success("Customer added successfully");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                console.log("Error while creating customer: ", error.response.data.message);
            } else {
                toast.error("An unexpected error occurred");
                console.log("Error while creating customer: ", error);
            }
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`/api/customer/deleteCustomer/${id}`);
            getCustomers();
            console.log("Customer deleted successfully");
            toast.success("Customer deleted successfully");
        } catch (error) {
            console.log("Error while deleting customer: ", error);
            toast.error("Error while deleting customer");
        }
    };

    const updateCustomer = async (id, customerItem) => {
        try {
            await axios.put(`/api/customer/updateCustomer/${id}`, customerItem);
            getCustomers();
            console.log("Customer updated successfully");
            toast.success("Customer updated successfully");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                console.log("Error while updating customer: ", error.response.data.message);
            } else {
                toast.error("An unexpected error occurred");
                console.log("Error while updating customer: ", error);
            }
        }
    };

    const searchCustomer = async (item) => {
        try {
            if (!(item.trim() === "")) {
                const response = await axios.get(`/api/customer/searchCustomer/?q=${item}`);
                setCustomers(response.data);
            }
        } catch (error) {
            console.log("Error while searching customer: ", error);
        }
    };

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <CustomerContext.Provider value={{ customers, setCustomers, getCustomers, addCustomer, deleteCustomer, updateCustomer, searchCustomer, pagination }}>
            {children}
        </CustomerContext.Provider>
    );
};