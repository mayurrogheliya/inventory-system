import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Menu Button for Mobile */}
            <button
                className="relative md:hidden z-20 bg-gray-200 py-1 px-1 rounded-md hover:ring-1 hover:ring-black"
                onClick={toggleSidebar}
            >
                <FontAwesomeIcon icon={faRightFromBracket} />
            </button>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 md:w-52 bg-white shadow-lg z-30 lg:relative lg:w-64 flex flex-col h-screen transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 md:block`}>
                <div className="flex flex-col justify-between h-full">
                    {/* Logo or Title */}
                    <div className='flex justify-between bg-gray-100 p-4 gap-3 items-center'>
                        <div className="text-xl font-semibold text-center text-orange-700">Inventory System</div>
                        <button
                            className='bg-gray-200 px-3 py-1 rounded-md hover:ring-1 hover:ring-black hover:cursor-pointer md:hidden'
                            onClick={toggleSidebar}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col mt-4 space-y-2 px-4">
                        <NavLink
                            to="/category"
                            onClick={toggleSidebar}
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${isActive ? "hover:bg-orange-700" : "hover:bg-gray-100"} transition-colors duration-200 ${isActive ? "bg-orange-700 text-white" : "text-gray-700"}`
                            }
                        >
                            Category
                        </NavLink>
                        <NavLink
                            to="/product"
                            onClick={toggleSidebar}
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${isActive ? "hover:bg-orange-700" : "hover:bg-gray-100"} transition-colors duration-200 ${isActive ? "bg-orange-700 text-white" : "text-gray-700"}`
                            }
                        >
                            Product
                        </NavLink>
                        <NavLink
                            to="/customer"
                            onClick={toggleSidebar}
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${isActive ? "hover:bg-orange-700" : "hover:bg-gray-100"} transition-colors duration-200 ${isActive ? "bg-orange-700 text-white" : "text-gray-700"}`
                            }
                        >
                            Customer
                        </NavLink>
                        <NavLink
                            to="/invoice"
                            onClick={toggleSidebar}
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${isActive ? "hover:bg-orange-700" : "hover:bg-gray-100"} transition-colors duration-200 ${isActive ? "bg-orange-700 text-white" : "text-gray-700"}`
                            }
                        >
                            Invoice
                        </NavLink>
                    </nav>

                    {/* Footer */}
                    <div className="mt-auto p-4 text-center text-gray-500 bg-gray-100">All rights reserved</div>
                </div>
            </aside>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};
