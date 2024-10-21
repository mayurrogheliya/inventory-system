import React, { useState } from 'react'
import Category from './Category'
import CategoryItems from './CategoryItems'
import { CategoryProvider } from '../../contexts';

const CategoryMain = () => {

  const [currentCategory, setCurrentCategory] = useState([]);
  return (
    <div>
      <CategoryProvider>
        <Category currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
        <CategoryItems setCurrentCategory={setCurrentCategory} />
      </CategoryProvider>
    </div>
  )
}

export default CategoryMain
