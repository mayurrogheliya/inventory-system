import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
    return (
        <>
            <header className="shadow-sm  top-0">
                <nav className="bg-white border-gray-200 px-2 lg:px-6">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <div
                            className="my-4 justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        >
                            <ul className="flex flex-col mt-4 gap-2 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `block pr-4 pl-3 duration-200 no-underline ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Category
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/products"
                                        className={({ isActive }) =>
                                            `block pr-4 pl-3 no-underline duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Product
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

