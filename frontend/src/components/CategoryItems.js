import React from 'react'

const CategoryItems = () => {
  return (
    <div>
      <div className='md:mx-5 md:px-4 sm:mx-4 sm:px-3 mx-3 px-2'>
        <h1 className='font-bold sm:text-3xl text-2xl'>Available Category</h1>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 my-5'>
          <div className='bg-gray-200 rounded-md border border-slate-500 shadow-lg max-w-sm mx-auto transform hover:scale-105 transition-transform duration-30'>
            <div className='md:p-3 sm:p-3 p-2'>
              <img className='w-full h-36 object-cover rounded' src="https://photosqn.com/wp-content/uploads/2024/05/radha-krishna-wallpapers-hd-download_0.webp" alt="images" />
              <p className='sm:text-xl text-lg font-bold pt-1'>Catergory</p>
              <p className='text-base font-serif'>Status: Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryItems
