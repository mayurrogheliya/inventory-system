import { useState } from 'react'
import { CategoryProvider } from '../../contexts';
import { Outlet } from 'react-router-dom';

const CategoryMain = () => {

    const [currentCategory, setCurrentCategory] = useState([]);
    return (
        <div className='lg:m-3 lg:p-2 md:m-4 md:p-3 m-3 p-2'>
            <CategoryProvider>
                <Outlet context={{ currentCategory, setCurrentCategory }} />
            </CategoryProvider>
        </div>
    )
}

export default CategoryMain
