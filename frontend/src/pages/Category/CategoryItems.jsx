/* eslint-disable react/prop-types */

import { useCallback, useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faSearch, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryContext } from '../../contexts';
import debounce from 'lodash.debounce'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';

const CategoryItems = () => {

    const { setCurrentCategory } = useOutletContext();

    const navigate = useNavigate();

    const { categorys, deleteCategory, searchCategory, getCategoryies, pagination } = useContext(CategoryContext);

    const [sortConfig, setSortConfig] = useState({ field: 'name', isAscending: true });

    const [searchTerm, setSearchTerm] = useState('');

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

    const debouncedSearch = useCallback(
        debounce((term) => {
            if (term.trim() === '') {
                getCategoryies();
            } else {
                searchCategory(term);
            }
        }, 500),
        []
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
            getCategoryies(newPage);  // Fetch categories for the new page
        }
    };

    const handleItemClick = (item) => {
        setCurrentCategory(item); // Set the current category
        if (item) {
            navigate('/category/updateCategory'); // Navigate to the updateCategory route
        } else {
            navigate('/category/addCategory'); // Navigate to the addCategory route
        }
    };

    return (
        <div>
            <div className='flex justify-end mb-3'>
                <button className='text-white bg-blue-600 py-1 px-3 rounded-md' onClick={() => handleItemClick(null)}>Add <FontAwesomeIcon icon={faPlus} /></button>
            </div>
            <div>
                <div className='flex justify-between items-start flex-col sm:flex-row gap-y-4'>
                    <h1 className='font-bold sm:text-3xl text-2xl'>Available Category</h1>
                    <div className='border rounded flex items-center'>
                        <div className='relative w-full'>
                            <input
                                className='outline-none px-2 py-1 pl-10 w-full'
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search categories..."
                            />
                            <FontAwesomeIcon
                                icon={faSearch} // Add the search icon
                                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                            />
                        </div>
                    </div>
                </div>
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
                                {categorys.slice(0).reverse().map((item, index) =>
                                    <tr key={item.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                        <td className='border border-slate-700 sm:px-2 px-1'>
                                            {highlightText(item.name, searchTerm)}
                                        </td>
                                        <td className='border border-slate-700 px-2'>
                                            <span className={`py-1 px-3 rounded-md ${item.status === "Active" ? "text-green-500 font-medium bg-green-100" : "text-red-500 font-medium bg-red-100"}`}>
                                                {highlightText(item.status, searchTerm)}
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
                                            <button className='m-1 bg-green-500 hover:bg-green-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => handleItemClick(item)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                            <button className='m-1 bg-red-500 hover:bg-red-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => deleteCategory(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            : "No data available"}

                    </table>
                </div>
            </div>

            {/* pagination */}
            <div className='flex justify-center items-center my-4'>
                <Pagination
                    pagination={pagination}
                    handlePageChange={handlePageChange}
                />
            </div>

        </div>
    )
}

export default CategoryItems
