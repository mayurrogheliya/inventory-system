import React, { useContext, useEffect, useRef, useState } from 'react';
import CategoryContext from '../contexts/CategoryContext.js';

const Category = ({ currentCategory, setCurrentCategory }) => {
  const { addCategories, updateCategory } = useContext(CategoryContext);

  const [categoryItems, setCategoryItems] = useState({ name: '', image: '', status: 'Active' });
  const imageRef = useRef(null);

  const [imagePreviews, setImagePreviews] = useState(null);

  useEffect(() => {
    if (currentCategory) {
      setCategoryItems({
        ...currentCategory,
        name: currentCategory.name || "",
        status: currentCategory.status || "Active"
      });
    } else {
      setCategoryItems({ name: '', image: '', status: 'Active' });
    }
  }, [currentCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (imageRef.current) {
      imageRef.current.value = '';
      console.log(imageRef.current);
    }
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
      image: e.target.files[0],
    }),
    );
  }


  return (
    <div>
      <div className='md:m-5 md:p-4 sm:m-4 sm:p-3 m-3 p-2'>
        <h1 className='font-bold sm:text-3xl text-2xl'>Add Category</h1>
        <form className='flex flex-col w-full my-3 gap-2' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cname" className='block'>Name</label>
            <input type="text" name="name" id="name" value={categoryItems.name} onChange={handleOnChange} className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400' autoFocus />
          </div>
          <div>
            <label htmlFor="cimg" className='block'>Upload Image</label>
            <div className='bg-gray-100 w-full rounded-md p-2 border border-gray-300'>
              <input type="file" name="image" id="image" onChange={handleImage} ref={imageRef} className='bg-gray-100 w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 hover:cursor-pointer' accept='image/*' />
              <div className='mt-2'>
                {
                  imagePreviews ? (
                    <img className='w-12 h-12' src={imagePreviews} alt="" />
                  ) : categoryItems.image ? (
                    <img className='w-12 h-12' src={`http://localhost:5000/${categoryItems.image}`} alt="" />
                  ) : null
                }
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="status" className='block'>Status</label>
            <select name="status" value={categoryItems.status} id="status" onChange={handleOnChange} className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400'>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className='bg-blue-600 text-white self-start py-1 px-4 mt-3 text-lg rounded-lg hover:bg-blue-700'>{categoryItems.id ? 'Update' : 'Add'}</button>
        </form>
      </div>
    </div>
  )
}

export default Category
