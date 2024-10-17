import React, { useEffect, useState } from 'react'
import Category from './components/Category'
import CategoryItems from './components/CategoryItems'
import { CategoryContext } from './contexts/CategoryContext';
import axios from 'axios';

const App = () => {

  const [categorys, setCategorys] = useState([]);

  const [currentCategory, setCurrentCategory] = useState([]);

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
    } catch (error) {
      console.log("Error creating category: ", error);
    }
  }

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/deleteCategory/${id}`);
      setCategorys((prev) => prev.filter(item => item.id !== id));
      console.log("Category deleted successfully");
    } catch (error) {
      console.log("Error while deleting category: ", error);
    }
  };

  const updateCategory = async (id, categorysItem) => {
    try {
      await axios.put(`http://localhost:5000/api/categories/updateCategory/${id}`, categorysItem);
      getCategoryies();
      console.log("Category updated successfully");
    } catch (error) {
      console.log("Error while updating category: ", error);
    }
  }

  useEffect(() => {
    getCategoryies();
  }, []);

  return (
    <>
      <CategoryContext.Provider value={{ categorys, addCategories, deleteCategory, updateCategory, currentCategory, setCurrentCategory }}>
        <Category />
        <CategoryItems />
      </CategoryContext.Provider>
    </>
  )
}

export default App
