import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import ProductMain from './pages/Product/ProductMain'
import CategoryMain from './pages/Category/CategoryMain'
import { Layout } from './components/Layout'
import CustomerMain from './pages/Customer/CustomerMain'
import CategoryItems from './pages/Category/CategoryItems'
import Category from './pages/Category/Category'
import ProductItems from './pages/Product/ProductItems'
import Product from './pages/Product/Product'
import CustomerItems from './pages/Customer/CustomerItems'
import Customer from './pages/Customer/Customer'
import Invoice from './pages/Invoice/Invoice'
import NotFound from './pages/NotFound/notfound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Navigate to='/category' replace />} />
      <Route path='category' element={<CategoryMain />}>
        <Route index element={<CategoryItems />} />
        <Route path='addCategory' element={<Category />} />
        <Route path='updateCategory' element={<Category />} />
      </Route>
      <Route path='product' element={<ProductMain />} >
        <Route index element={<ProductItems />} />
        <Route path='addProduct' element={<Product />} />
        <Route path='updateProduct' element={<Product />} />
      </Route>
      <Route path='customer' element={<CustomerMain />} >
        <Route index element={<CustomerItems />} />
        <Route path='addCustomer' element={<Customer />} />
        <Route path='updateCustomer' element={<Customer />} />
      </Route>
      <Route path='invoice' element={<Invoice />} />

      {/* not found */}
      <Route path='*' element={<NotFound />} />
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
