/* eslint-disable react/prop-types */

import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryContext } from '../../contexts';


const CategoryItems = ({ setCurrentCategory }) => {

    const { categorys, deleteCategory } = useContext(CategoryContext);

    const [sortConfig, setSortConfig] = useState({ field: 'name', isAscending: true });

    const sortingAlgo = async (field) => {

        const isAscending = sortConfig.field === field ? !sortConfig.isAscending : true;

        categorys.sort((a, b) => {
            if (isAscending) {
                return a[field].localeCompare(b[field]);
            } else {
                return b[field].localeCompare(a[field]);
            }
        });
        setSortConfig({ field, isAscending });
    }

    return (
        <div>
            <div className='md:mx-5 md:px-4 sm:mx-4 sm:px-3 mx-3 px-2'>
                <h1 className='font-bold sm:text-3xl text-2xl'>Available Category</h1>
                <div className='overflow-x-scroll my-2 gap-1'>
                    <table className='table table-auto border-collapse border border-slate-500 w-full'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600'>Name
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('name')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>Status
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('status')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>Image</th>
                                <th className='border border-slate-600 w-40 sm:w-40 md:w-60 lg:w-70 xl:w-80 '>Action</th>
                            </tr>
                        </thead>

                        {categorys.length > 0 ?
                            <tbody>
                                {categorys.slice(0).reverse().map((item) =>
                                    <tr key={item.id}>
                                        <td className='border border-slate-700 sm:px-2 px-1'>{item.name}</td>
                                        <td className='border border-slate-700 px-2'>
                                            <span className={`py-1 px-3 rounded-md ${item.status === "Active" ? "text-green-500 font-medium bg-green-100" : "text-red-500 font-medium bg-red-100"}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className='border border-slate-700 py-1 sm:px-2 px-1'>
                                            {item.image ? (
                                                <img className='w-14 h-14 rounded-sm' src={`http://localhost:5000/${item.image}`} alt="Category" />
                                            )
                                                :
                                                (
                                                    <span>No Image</span>
                                                )
                                            }
                                        </td>
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
