import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

const CategoryItems = () => {

  const [categorys, setCategorys] = useState([])
  const [currentCategory, setCurrentCategory] = useState({ name: '', image: '', status: 'Inactive' });
  const [editMode, setEditMode] = useState(false);

  const getDetails = async () => {
    await axios.get("http://localhost:5000/api/categories/getCategory")
      .then(response => setCategorys(response.data));
  }

  useEffect(() => {
    getDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/deleteCategory/${id}`);
      getDetails();
    } catch (error) {
      console.log("Error while deleting category: ", error);
    }
  }

  const handleUpdate = (category) => {
    setCurrentCategory(category);
    setEditMode(true);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setCurrentCategory((prevCategory) => ({
      ...prevCategory,
      image: e.target.files[0],
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', currentCategory.name);
    formData.append('status', currentCategory.status);
    if (currentCategory.image) {
      formData.append('image', currentCategory.image);
    }

    try {
      await axios.put(`http://localhost:5000/api/categories/updateCategory/${currentCategory.id}`, formData,
        {
          headers: {
            'Content-Type': "multipart/form-data",
          }
        }
      );
      getDetails();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div>
      <div className='md:mx-5 md:px-4 sm:mx-4 sm:px-3 mx-3 px-2'>
        <h1 className='font-bold sm:text-3xl text-2xl'>Available Category</h1>
        <table className='table table-auto border-collapse border border-slate-500 w-full my-5'>
          <thead>
            <tr>
              <th className='border border-slate-600'>Name</th>
              <th className='border border-slate-600'>Image</th>
              <th className='border border-slate-600'>Status</th>
              <th className='border border-slate-600 w-80'>Action</th>
            </tr>
          </thead>
          <tbody>
            {categorys.map((item) =>
              <tr key={item.id}>
                <td className='border border-slate-700 sm:px-2 px-1'>{item.name}</td>
                <td className='border border-slate-700 py-1 sm:px-2 px-1'>
                  <img className='w-14 h-14 rounded-sm' src={`http://localhost:5000/${item.image}`} alt="images" />
                </td>
                <td className='border border-slate-700 px-2'>{item.status}</td>
                <td className='border border-slate-700 px-2'>
                  <button className='m-1 bg-green-500 hover:bg-green-600 text-white rounded-md sm:px-4 px-3 py-1' onClick={() => handleUpdate(item)}>Edit</button>
                  <button className='m-1 bg-red-500 hover:bg-red-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            )}
          </tbody>

        </table>

        {/* Modal for edit category */}
        <Modal show={editMode} onHide={() => setEditMode(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className='flex flex-col w-full my-3 gap-2'>
              <div>
                <label htmlFor='cname' className='block'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={currentCategory.name}
                  onChange={handleOnChange}
                  className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400'
                />
              </div>
              <div>
                <label htmlFor='cimg' className='block'>
                  Upload Image
                </label>
                <input
                  type='file'
                  name='image'
                  id='image'
                  onChange={handleImageChange}
                  className='bg-gray-100 w-full rounded-md p-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 hover:cursor-pointer'
                  accept='image/*'
                />
              </div>
              <div>
                <label htmlFor='status' className='block'>
                  Status
                </label>
                <select
                  name='status'
                  id='status'
                  value={currentCategory.status}
                  onChange={handleOnChange}
                  className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400'
                >
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setEditMode(false)}>
              Close
            </Button>
            <Button variant='primary' onClick={handleOnSubmit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default CategoryItems
