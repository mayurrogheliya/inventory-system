import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ProductMain from './pages/Product/ProductMain'
import CategoryMain from './pages/Category/CategoryMain'
import { Layout } from './components/Layout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<CategoryMain />} />
      <Route path='products' element={<ProductMain />} />
    </Route>
  )
)

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
