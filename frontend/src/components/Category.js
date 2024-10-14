import React from 'react'

const Category = () => {
  return (
    <div>
      <div className='md:m-5 md:p-4 sm:m-4 sm:p-3 m-3 p-2'>
        <h1 className='font-bold sm:text-3xl text-2xl'>Add Category</h1>
        <form className='flex flex-col w-full my-3 gap-2'>
          <div>
            <label htmlFor="cname" className='block'>Name</label>
            <input type="text" name="cname" id="cname" className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400' />
          </div>
          <div>
            <label htmlFor="cimg" className='block'>Upload Image</label>
            <input type="file" name="cimg" id="cimg" className='bg-gray-100 w-full rounded-md p-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 hover:cursor-pointer' accept='image/*' />
          </div>
          <div>
            <label htmlFor="status" className='block'>Status</label>
            <select name="status" id="status" className='border border-gray-300 py-1 px-2 focus:outline-none focus:border-gray-400 w-full rounded-md focus:ring-1 focus:ring-gray-400'>
              <option value="active" selected>Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className='bg-blue-600 text-white self-start py-1 px-4 mt-3 text-lg rounded-lg hover:bg-blue-700'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default Category
