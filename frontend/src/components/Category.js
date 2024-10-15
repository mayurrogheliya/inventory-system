import React, { useState } from 'react';
import axios from 'axios';

const Category = () => {

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("Inactive");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("status", status);

    try {
      const response = await axios.post("http://localhost:5000/api/categories/addCategory", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Category created successfully: ", response.data);
    } catch (error) {
      console.log("Error creating category: ", error);
    }

    setName('');
    setImage(null);
    setStatus("Inactive");
  }

  return (
    <div>
      <div className='md:m-5 md:p-4 sm:m-4 sm:p-3 m-3 p-2'>
        <h1 className='font-bold sm:text-3xl text-2xl'>Add Category</h1>
        <form className='flex flex-col w-full my-3 gap-2' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cname" className='block'>Name</label>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(() => e.target.value)} className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400' />
          </div>
          <div>
            <label htmlFor="cimg" className='block'>Upload Image</label>
            <input type="file" name="image" id="image" onChange={(e) => setImage(() => e.target.files[0])} className='bg-gray-100 w-full rounded-md p-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 hover:cursor-pointer' accept='image/*' />
          </div>
          <div>
            <label htmlFor="status" className='block'>Status</label>
            <select name="status" value={status} id="status" onChange={(e) => setStatus(e.target.value)} className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400'>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className='bg-blue-600 text-white self-start py-1 px-4 mt-3 text-lg rounded-lg hover:bg-blue-700'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default Category
