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

    const formatDate = (dateString) => {
        if (dateString === '0000-00-00') {
            return '';
        }
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
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
                                        Email
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('email')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    <div className='flex items-center gap-2'>
                                        Phone
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('phone')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    <div className='flex items-center gap-2'>
                                        Country
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('country')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    <div className='flex items-center gap-2'>
                                        State
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('state')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    <div className='flex items-center gap-2'>
                                        City
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('city')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    <div className='flex items-center gap-2'>
                                        Pincode
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('pincode')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    <div className='flex items-center gap-2'>
                                        Occuption
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('occupation')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>DOB</th>
                                <th scope='col' className='px-4 py-3'>
                                    <div className='flex items-center gap-2'>
                                        Gender
                                        <FontAwesomeIcon
                                            icon={faSort}
                                            onClick={() => sortingAlgo('gender')}
                                            className='hover:cursor-pointer' />
                                    </div>
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    Address
                                </th>
                                <th scope='col' className='px-4 py-3'>
                                    Image
                                </th>
                                <th className='px-4 py-3'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {customers.length > 0 ?
                            <tbody className='divide-y divide-gray-300'>
                                {customers.slice(0).reverse().map((item) =>
                                    <tr key={item.id} className='bg-zinc-50 font-medium hover:bg-gray-100'>
                                        <td className='px-4 py-2'>
                                            {highlightText(item.name, searchTerm)}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {highlightText(item.email, searchTerm)}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {highlightText(item.phone, searchTerm)}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {highlightText(item.country, searchTerm)}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {highlightText(item.state, searchTerm)}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {highlightText(item.city, searchTerm)}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {highlightText(item.pincode, searchTerm)}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {highlightText(item.occupation, searchTerm)}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {item.dob ? formatDate(item.dob) : "N/A"}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {highlightText(item.gender, searchTerm)}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {highlightText(item.address, searchTerm)}
                                        </td>
                                        <td className='px-4 py-2'>
                                            {item.image ? (
                                                <img className='w-14 h-14 rounded-sm' src={`http://localhost:5000/${item.image}`} alt="Customer" />
                                            )
                                                :
                                                (
                                                    <span>No Image</span>
                                                )
                                            }
                                        </td>
                                        <td className='px-4 py-2'>
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
