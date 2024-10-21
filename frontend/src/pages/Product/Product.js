import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProductContext } from '../../contexts';

const Product = ({ currentProduct, setCurrentProduct }) => {

    const { addProduct, updateProduct } = useContext(ProductContext);

    const [productItems, setProductItems] = useState({ name: '', category: '', price: '', status: 'Active', weight: '', image: '' })

    const [imagePreview, setImagePreview] = useState(null);
    const imageRef = useRef(null);

    useEffect(() => {
        if (currentProduct) {
            setProductItems({
                ...currentProduct,
                status: currentProduct.status || "Active",
            });
            if (currentProduct.image) {
                setImagePreview(`http://localhost:5000/${currentProduct.image}`);
            } else {
                setImagePreview(null);
            }
        } else {
            setProductItems({ name: '', category: '', price: '', status: 'Active', weight: '', image: '' });
            setImagePreview(null);
        }
        if (imageRef.current) {
            imageRef.current.value = '';
            console.log(imageRef.current);
        }
    }, [currentProduct])

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", productItems.name);
        formData.append("category", productItems.category);
        formData.append("price", productItems.price);
        formData.append("status", productItems.status);
        formData.append("weight", productItems.weight);
        formData.append("image", productItems.image);

        if (productItems.id) {
            await updateProduct(currentProduct.id, formData);
        } else {
            await addProduct(formData);
        }

        setProductItems({ name: '', category: '', price: '', status: 'Active', weight: '', image: '' });
        setCurrentProduct([]);

    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setProductItems((prevProductItems) => ({
            ...prevProductItems,
            [name]: value,
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        }
        reader.readAsDataURL(file);
        setProductItems((prevProductItems) => ({
            ...prevProductItems,
            image: file,
        }))
    }

    // get category
    const [categorys, setCategorys] = useState([]);
    const getCategoryies = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/categories/getCategory");
            const categoryName = response.data
                .filter(category => category.status === "Active" && category.name !== "")
            console.log(categoryName);
            setCategorys(categoryName);
        } catch (error) {
            console.log("Error while fetching categories: ", error);
        }
    }

    useEffect(() => {
        getCategoryies();
    }, []);

    return (
        <div>
            <div>
                <div className='md:m-5 md:p-4 sm:m-4 sm:p-3 m-3 p-2'>
                    <h1 className='font-bold sm:text-3xl text-2xl'>Add Product</h1>
                    <form className='flex flex-col w-full my-3 gap-2' onSubmit={handleOnSubmit}>
                        <div>
                            <label htmlFor="name" className='block'>Name</label>
                            <input type="text" name="name" id="name" value={productItems.name} onChange={handleOnChange} className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400' required />
                        </div>
                        <div>
                            <label htmlFor="category" className='block'>Category</label>
                            <select name="category" id="category" value={productItems.category} onChange={handleOnChange} className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400' required>
                                <option value="" disabled selected >Select Category</option>
                                {
                                    categorys.map(category => (
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="price" className='block'>Price</label>
                            <input type="number" name="price" id="price" value={productItems.price} onChange={handleOnChange} className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400' required />
                        </div>
                        <div>
                            <label htmlFor="status" className='block'>Status</label>
                            <select name="status" id="status" value={productItems.status} onChange={handleOnChange} className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400'>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="weight" className='block'>Weight</label>
                            <input type="number" name="weight" id="weight" value={productItems.weight} onChange={handleOnChange} className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400' />
                        </div>
                        <div>
                            <label htmlFor="image" className='block'>Upload Image</label>
                            <div className='bg-gray-100 w-full rounded-md p-2 border border-gray-300'>
                                <input type="file" name="image" id="image" ref={imageRef} onChange={handleImageChange} className='bg-gray-100 w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 hover:cursor-pointer' accept='image/*' />
                                <div className='mt-2'>
                                    {imagePreview && (
                                        <img className='w-12 h-12' src={imagePreview} alt="Product Preview" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className='bg-blue-600 text-white self-start py-1 px-4 mt-3 text-lg rounded-lg hover:bg-blue-700'>{productItems.id ? 'Update' : 'Add'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Product
