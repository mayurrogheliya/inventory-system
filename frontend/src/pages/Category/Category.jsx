/* eslint-disable react/prop-types */

import { useContext, useEffect, useRef, useState } from 'react';
import { CategoryContext } from '../../contexts';

const Category = ({ currentCategory, setCurrentCategory }) => {
    const { addCategories, updateCategory, categorys } = useContext(CategoryContext);

    const [categoryItems, setCategoryItems] = useState({ name: '', image: '', status: 'Active' });
    const imageRef = useRef(null);

    const [imagePreviews, setImagePreviews] = useState(null);

    const [error, setError] = useState('');

    useEffect(() => {
        if (currentCategory) {
            setCategoryItems({
                ...currentCategory,
                name: currentCategory.name || "",
                status: currentCategory.status || "Active"
            });
            if (currentCategory.image) {
                setImagePreviews(`http://localhost:5000/${currentCategory.image}`);
            } else {
                setImagePreviews(null);
            }
        } else {
            setCategoryItems({ name: '', image: '', status: 'Active' });
            setImagePreviews(null);
        }
        if (imageRef.current) {
            imageRef.current.value = '';
            console.log(imageRef.current);
        }
    }, [currentCategory]);

    const validateName = (name) => {
        const regex = /^[A-Za-z]/; // Checks if first character is an alphabet
        return regex.test(name);
    };

    // Function to check if the category name already exists
    const doesNameExist = (name) => {
        return categorys.some((category) => category.name.toLowerCase() === name.toLowerCase() && category.id !== currentCategory?.id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate name field
        if (!validateName(categoryItems.name)) {
            setError('Name must start with an alphabetic latter');
            return; // Stop form submission
        }

        // Check if name already exists
        if (doesNameExist(categoryItems.name)) {
            setError('Category Name already exists.');
            return; // Stop form submission
        }

        // Clear error if validation passes
        setError('');

        const formData = new FormData();
        formData.append("name", categoryItems.name);
        formData.append("image", categoryItems.image);
        formData.append("status", categoryItems.status);

        if (categoryItems.id) {
            await updateCategory(currentCategory.id, formData);
        } else {
            await addCategories(formData);
        }


        setCategoryItems({ name: '', image: '', status: 'Active' });
        setCurrentCategory([]);
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setCategoryItems((prevCategoryItems) => ({
            ...prevCategoryItems,
            [name]: value,
        }));
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreviews(e.target.result);
        };
        reader.readAsDataURL(file);
        setCategoryItems((prevCategoryItems) => ({
            ...prevCategoryItems,
            image: file,
        }),
        );
    }


    return (
        <div>
            <div className='md:m-5 md:p-4 sm:m-4 sm:p-3 m-3 p-2'>
                <h1 className='font-bold sm:text-3xl text-2xl'>Add Category</h1>
                <form className='grid grid-cols-1 md:grid-cols-3 w-full my-3 gap-y-4 gap-x-3' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="cname">Name</label>
                        <input type="text" name="name" id="name" value={categoryItems.name} onChange={handleOnChange} className={`border py-1 px-2 focus:outline-none w-full rounded-md focus:ring-1  ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400'}`} />
                        {error && <p className='text-red-500 text-sm'>{error}</p>}
                    </div>
                    <div>
                        <label htmlFor="cimg">Upload Image</label>
                        <div className='bg-gray-100 w-full rounded-md p-2 border border-gray-300'>
                            <input type="file" name="image" id="image" onChange={handleImage} ref={imageRef} className='bg-gray-100 w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 hover:cursor-pointer' />
                            <div className='mt-2'>
                                {
                                    imagePreviews && (
                                        <img className='w-12 h-12' src={imagePreviews} alt="Category Preview" />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="status">Status</label>
                        <select name="status" value={categoryItems.status} id="status" onChange={handleOnChange} className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400'>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit" className='bg-blue-600 w-full sm:w-auto text-white self-start py-1 px-4 mt-3 text-lg rounded-lg hover:bg-blue-700'>
                            {categoryItems.id ? 'Update' : 'Add'}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Category
