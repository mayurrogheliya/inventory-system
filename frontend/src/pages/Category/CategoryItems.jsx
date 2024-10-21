/* eslint-disable react/prop-types */

import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSortDown, faSortUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryContext } from '../../contexts';


const CategoryItems = ({ setCurrentCategory }) => {

    const { categorys, deleteCategory } = useContext(CategoryContext);

    return (
        <div>
            <div className='md:mx-5 md:px-4 sm:mx-4 sm:px-3 mx-3 px-2'>
                <h1 className='font-bold sm:text-3xl text-2xl'>Available Category</h1>
                <div className='overflow-x-scroll'>
                    <div className='my-2 flex flex-row-reverse gap-1'>
                        <button className='bg-gray-200 px-2 pt-1 rounded'>
                            <FontAwesomeIcon icon={faSortUp} />
                        </button>
                        <button className='bg-gray-200 px-2 pb-1 rounded'>
                            <FontAwesomeIcon icon={faSortDown} />
                        </button>
                    </div>
                    <table className='table table-auto border-collapse border border-slate-500 w-full'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600'>Name</th>
                                <th className='border border-slate-600'>Image</th>
                                <th className='border border-slate-600'>Status</th>
                                <th className='border border-slate-600 w-40 sm:w-40 md:w-60 lg:w-70 xl:w-80 '>Action</th>
                            </tr>
                        </thead>

                        {categorys.length > 0 ?
                            <tbody>
                                {categorys.slice(0).reverse().map((item) =>
                                    <tr key={item.id}>
                                        <td className='border border-slate-700 sm:px-2 px-1'>{item.name}</td>
                                        <td className='border border-slate-700 py-1 sm:px-2 px-1'>
                                            <img className='w-14 h-14 rounded-sm' src={`http://localhost:5000/${item.image}`} alt="images" />
                                        </td>
                                        <td className='border border-slate-700 px-2'>{item.status}</td>
                                        <td className='border border-slate-700 px-2'>
                                            <button className='m-1 bg-green-500 hover:bg-green-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => setCurrentCategory(item)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                            <button className='m-1 bg-red-500 hover:bg-red-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => deleteCategory(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
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

export default CategoryItems
