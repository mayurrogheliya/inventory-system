import React, { useState } from 'react'
import Category from './components/Category'
import CategoryItems from './components/CategoryItems'
import { CategoryProvider } from './contexts/CategoryContext.js';

const App = () => {

  const [currentCategory, setCurrentCategory] = useState([]);

  return (
    <>
      <CategoryProvider>
        <Category currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
        <CategoryItems setCurrentCategory={setCurrentCategory} />
      </CategoryProvider>
    </>
  )
}

export default App
