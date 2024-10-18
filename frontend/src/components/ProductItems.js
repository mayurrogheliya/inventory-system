import React, { useContext } from 'react'
import ProductContext from '../contexts/ProductContext.js'

const ProductItems = ({ setCurrentProduct }) => {

    const { products, deleteProduct } = useContext(ProductContext);

    return (
        <div>
            <div className='md:mx-5 md:px-4 sm:mx-4 sm:px-3 mx-3 px-2'>
                <h1 className='font-bold sm:text-3xl text-2xl'>Available Product</h1>
                <div className='overflow-x-scroll'>
                    <table className='table table-auto border-collapse border border-slate-500 w-full my-5'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600'>Name</th>
                                <th className='border border-slate-600'>Category</th>
                                <th className='border border-slate-600'>Price</th>
                                <th className='border border-slate-600'>Status</th>
                                <th className='border border-slate-600'>Weight</th>
                                <th className='border border-slate-600'>Image</th>
                                <th className='border border-slate-600'>Action</th>
                            </tr>
                        </thead>

                        {products.length > 0 ?
                            <tbody>
                                {products.map((item) =>
                                    <tr key={item.id}>
                                        <td className='border border-slate-700 px-2'>{item.name}</td>
                                        <td className='border border-slate-700 px-2'>{item.category}</td>
                                        <td className='border border-slate-700 px-2'>{item.price}</td>
                                        <td className='border border-slate-700 px-2'>{item.status}</td>
                                        <td className='border border-slate-700 px-2'>{item.weight}</td>
                                        <td className='border border-slate-700 px-2'>
                                            <img className='w-14 h-14 rounded-sm' src={`http://localhost:5000/${item.image}`} alt="images" />
                                        </td>
                                        <td className='border border-slate-700 px-2'>
                                            <button className='m-1 bg-green-500 hover:bg-green-600 text-white rounded-md sm:px-4 px-3 py-1' onClick={() => setCurrentProduct(item)}>Edit</button>
                                            <button className='m-1 bg-red-500 hover:bg-red-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => deleteProduct(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            : "No data available"}

                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductItems
