import { useState } from 'react'
import Category from './Category'
import CategoryItems from './CategoryItems'
import { CategoryProvider } from '../../contexts';

const CategoryMain = () => {

    const [currentCategory, setCurrentCategory] = useState([]);
    return (
        <div className='lg:m-3 lg:p-2 md:m-4 md:p-3 m-3 p-2'>
            <CategoryProvider>
                <Category currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
                <CategoryItems setCurrentCategory={setCurrentCategory} />
            </CategoryProvider>
        </div>
    )
}

export default CategoryMain
