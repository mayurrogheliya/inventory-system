/* eslint-disable react/prop-types */
import { useCallback, useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faSearch, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CustomerContext } from '../../contexts';
import debounce from 'lodash.debounce';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';

const CustomerItems = () => {

    const { setCurrentCustomer } = useOutletContext();

    const navigate = useNavigate();

    const { customers, deleteCustomer, searchCustomer, getCustomers, pagination } = useContext(CustomerContext);
    const [sortConfig, setSortConfig] = useState({ field: 'name', isAscending: true });
    const [searchTerm, setSearchTerm] = useState('');

    const sortingAlgo = async (field) => {
        const isAscending = sortConfig.field === field ? !sortConfig.isAscending : true;
        customers.sort((a, b) => {
            if (isAscending) {
                return a[field].localeCompare(b[field]);
            } else {
                return b[field].localeCompare(a[field]);
            }
        });
        setSortConfig({ field, isAscending });
    };

    const debouncedSearch = useCallback(
        debounce((term) => {
            if (term.trim() === '') {
                getCustomers();
            } else {
                searchCustomer(term);
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
        if (!searchTerm || !text) return text;
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ?
                <span key={index} className="bg-yellow-200">{part}</span> : part
        );
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            getCustomers(newPage);  // Fetch customers for the new page
        }
    };

    const handleItemClick = (item) => {
        setCurrentCustomer(item); // Set the current customer
        if (item) {
            navigate('/customer/updateCustomer'); // Navigate to the updateCustomer route
        } else {
            navigate('/customer/addCustomer'); // Navigate to the addCustomer route
        }
    };

    return (
        <div>
            <div className='flex justify-end mb-3'>
                <button className='text-white bg-blue-600 py-1 px-3 rounded-md' onClick={() => handleItemClick(null)}>Add <FontAwesomeIcon icon={faPlus} /></button>
            </div>
            <div>
                <div className='flex justify-between items-start flex-col sm:flex-row gap-y-4'>
                    <h1 className='font-bold sm:text-3xl text-2xl'>Available Customers</h1>
                    <div className='border rounded flex items-center'>
                        <div className='relative w-full'>
                            <input
                                className='outline-none px-2 py-1 pl-10 w-full'
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search customers..."
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
                                <th className='border border-slate-600'>Email
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('email')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>Phone
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('phone')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>Country

                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('country')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>State
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('state')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>City
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('city')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>Pincode
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('pincode')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>Occuption
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('occupation')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>DOB</th>
                                <th className='border border-slate-600'>Gender
                                    <FontAwesomeIcon
                                        icon={faSort}
                                        onClick={() => sortingAlgo('gender')}
                                        className='float-end m-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </th>
                                <th className='border border-slate-600'>Address</th>
                                <th className='border border-slate-600'>Image</th>
                                <th className='border border-slate-600 w-40 sm:w-40 md:w-60 lg:w-70 xl:w-80 '>Action</th>
                            </tr>
                        </thead>
                        {customers.length > 0 ?
                            <tbody>
                                {customers.slice(0).reverse().map((item, index) =>
                                    <tr key={item.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                        <td className='border border-slate-700 sm:px-2 px-1'>
                                            {highlightText(item.name, searchTerm)}
                                        </td>
                                        <td className='border border-slate-700 sm:px-2 px-1'>
                                            {highlightText(item.email, searchTerm)}
                                        </td>
                                        <td className='border border-slate-700 sm:px-2 px-1'>
                                            {highlightText(item.phone, searchTerm)}
                                        </td>
                                        <td className='border border-slate-700 sm:px-2 px-1'>
                                            {highlightText(item.country, searchTerm)}
                                        </td>
                                        <td className='border border-slate-700 sm:px-2 px-1'>
                                            {highlightText(item.state, searchTerm)}
                                        </td>
                                        <td className='border border-slate-700 sm:px-2 px-1'>
                                            {highlightText(item.city, searchTerm)}
                                        </td>
                                        <td className='border border-slate-700 sm:px-2 px-1'>
                                            {highlightText(item.pincode, searchTerm)}
                                        </td>
                                        <td className='border border-slate-700 sm:px-2 px-1'>
                                            {highlightText(item.occupation, searchTerm)}
                                        </td>
                                        <td className='border border-slate-700 sm:px-2 px-1'>
                                            {item.dob}
                                        </td>
                                        <td className='border border-slate-700 sm:px-2 px-1'>
                                            {highlightText(item.gender, searchTerm)}
                                        </td>
                                        <td className='border border-slate-700 sm:px-2 px-1'>
                                            {highlightText(item.address, searchTerm)}
                                        </td>
                                        <td className='border border-slate-700 py-1 sm:px-2 px-1'>
                                            {item.image ? (
                                                <img className='w-14 h-14 rounded-sm' src={`http://localhost:5000/${item.image}`} alt="Customer" />
                                            )
                                                :
                                                (
                                                    <span>No Image</span>
                                                )
                                            }
                                        </td>
                                        <td className='border border-slate-700 px-2'>
                                            <button className='m-1 bg-green-500 hover:bg-green-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => handleItemClick(item)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                            <button className='m-1 bg-red-500 hover:bg-red-600 text-white rounded-md sm:px-4 px-2 py-1' onClick={() => deleteCustomer(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
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
    );
};

export default CustomerItems;
