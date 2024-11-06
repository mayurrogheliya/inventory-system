/* eslint-disable react/prop-types */

import { useCallback, useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faSearch, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductContext } from '../../contexts';
import debounce from 'lodash.debounce';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';


const ProductItems = () => {

    const { setCurrentProduct } = useOutletContext();

    const navigate = useNavigate();

    const { products, deleteProduct, getProducts, searchProduct, pagination } = useContext(ProductContext);

    const [sortConfig, setSortConfig] = useState({ field: 'name', isAscending: true });

    const [searchTerm, setSearchTerm] = useState('');

    const sortingAlgo = async (field) => {
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

    const debouncedSearch = useCallback(
        debounce((term) => {
            if (term.trim() === '') {
                getProducts();
            } else {
                searchProduct(term);
            }
        }, 500),
        [],
    );

    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm, debouncedSearch]);

    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text;
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ?
                <span key={index} className="bg-yellow-200">{part}</span> : part
        );
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            getProducts(newPage);  // Fetch categories for the new page
        }
    };

    const handleItemClick = (item) => {
        setCurrentProduct(item); // Set the current product
        if (item) {
            navigate('/product/updateProduct'); // Navigate to the updateProduct route
        } else {
            navigate('/product/addProduct'); // Navigate to the addProduct route
        }
    };

    return (
        <div>
            <div className='flex justify-end mb-3'>
                <button className='text-white bg-blue-600 py-1 px-3 rounded-md' onClick={() => handleItemClick(null)}>Add <FontAwesomeIcon icon={faPlus} /></button>
            </div>
            <div>
                <div className='flex justify-between items-start flex-col sm:flex-row gap-y-4'>
                    <h1 className='font-bold sm:text-3xl text-2xl'>Available Product</h1>
                    <div className='border rounded flex items-center'>
                        <div className='relative w-full'>
                            <input
                                className='outline-none px-2 py-1 pl-10 w-full'
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search products..."
                            />
                            <FontAwesomeIcon
                                icon={faSearch} // Add the search icon
                                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                            />
                        </div>
                    </div>
                </div>
                <div className='overflow-x-auto my-3 sm:rounded-lg'>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-800 divide-y divide-gray-300'>
                        <thead className='text-xs text-gray-900 uppercase bg-gray-200'>
                            <tr>
                                <th scope='col' className='px-4 py-3'>
                                    <div className='flex items-center gap-2'>
                                        Name
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('name')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    <div className='flex items-center gap-2'>
                                        Category
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('category')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    <div className='flex items-center gap-2'>
                                        Price
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('price')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    <div className='flex items-center gap-2'>
                                        Weight
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('weight')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    <div className='flex items-center gap-2'>
                                        Status
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('status')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    Image
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {products.length > 0 ?
                            <tbody className='divide-y divide-gray-300'>
                                {products.slice(0).reverse().map((item) =>
                                    <tr key={item.id} className='bg-zinc-50 font-medium hover:bg-gray-100'>
                                        <td className='px-4 py-2'>
                                            {highlightText(item.name, searchTerm)}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {highlightText(item.category, searchTerm)}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {item.price}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {item.weight}
                                        </td>
                                        <td className='px-4 py-2'>
                                            <span className={`py-1 px-3 rounded-md ${item.status === "Active" ? "text-green-500 font-medium bg-green-100" : "text-red-500 font-medium bg-red-100"}`}>
                                                {highlightText(item.status, searchTerm)}
                                            </span>
                                        </td>
                                        <td className='px-4 py-2'>
                                            {item.image ? (
                                                <img className='w-14 h-14 rounded-sm' src={`http://localhost:5000/${item.image}`} alt="product" />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </td>
                                        <td className='px-4 py-2'>
                                            <button className='m-1 bg-green-500 hover:bg-green-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => handleItemClick(item)}><FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button className='m-1 bg-red-500 hover:bg-red-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => deleteProduct(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            : "No data available"}

                    </table>
                </div>
            </div >

            {/* pagination */}
            <div className='flex justify-center items-center my-4' >
                <Pagination
                    pagination={pagination}
                    handlePageChange={handlePageChange}
                />
            </div >

        </div >
    )
}

export default ProductItems
