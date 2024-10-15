import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CategoryItems = () => {

  const [categorys, setCategorys] = useState([])

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
                  <button className='m-1 bg-green-500 hover:bg-green-600 text-white rounded-md sm:px-4 px-2 py-1'>Edit</button>
                  <button className='m-1 bg-red-500 hover:bg-red-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default CategoryItems
