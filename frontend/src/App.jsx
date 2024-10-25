import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ProductMain from './pages/Product/ProductMain'
import CategoryMain from './pages/Category/CategoryMain'
import { Layout } from './components/Layout'
import CustomerMain from './pages/Customer/CustomerMain'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<CategoryMain />} />
      <Route path='products' element={<ProductMain />} />
      <Route path='customer' element={<CustomerMain />} />
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
