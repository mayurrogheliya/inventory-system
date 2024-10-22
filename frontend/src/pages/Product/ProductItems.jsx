/* eslint-disable react/prop-types */

import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductContext } from '../../contexts';


const ProductItems = ({ setCurrentProduct }) => {

    const { products, deleteProduct } = useContext(ProductContext);

    const [sortConfig, setSortConfig] = useState({ field: 'name', isAscending: true });

    const sortingAlgo = (field) => {
        const isAscending = sortConfig.field === field ? !sortConfig.isAscending : true;

        products.sort((a, b) => {

            const aValue = a[field];
            const bValue = b[field];

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return isAscending ? aValue - bValue : bValue - aValue;
            } else {
                return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
        })

        setSortConfig({ field, isAscending });
    }

    return (
        <div>
            <div className='md:mx-5 md:px-4 sm:mx-4 sm:px-3 mx-3 px-2'>
                <h1 className='font-bold sm:text-3xl text-2xl'>Available Product</h1>
                <div className='overflow-x-scroll my-2 gap-1'>
                    <table className='table-auto w-full'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600'>Name
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('name')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>Category
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('category')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>Price
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('price')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>Weight
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('weight')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>Status
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('status')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>Image</th>
                                <th className='border border-slate-600'>Action</th>
                            </tr>
                        </thead>

                        {products.length > 0 ?
                            <tbody>
                                {products.slice(0).reverse().map((item) =>
                                    <tr key={item.id}>
                                        <td className='border border-slate-700 px-2'>{item.name}</td>
                                        <td className='border border-slate-700 px-2'>{item.category}</td>
                                        <td className='border border-slate-700 px-2'>{item.price}</td>
                                        <td className='border border-slate-700 px-2'>{item.weight}</td>
                                        <td className='border border-slate-700 px-2'>
                                            <span className={`py-1 px-3 rounded-md ${item.status === "Active" ? "text-green-500 font-medium bg-green-100" : "text-red-500 font-medium bg-red-100"}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className='border border-slate-700 px-2'>
                                            {item.image ? (
                                                <img className='w-14 h-14 rounded-sm' src={`http://localhost:5000/${item.image}`} alt="product" />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </td>
                                        <td className='border border-slate-700 px-2'>
                                            <button className='m-1 bg-green-500 hover:bg-green-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => setCurrentProduct(item)}><FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button className='m-1 bg-red-500 hover:bg-red-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => deleteProduct(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
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
