import { useState } from 'react'
import Product from './Product'
import ProductItems from './ProductItems';
import { ProductProvider } from '../../contexts';

const ProductMain = () => {

    const [currentProduct, setCurrentProduct] = useState([]);

    return (
        <div className='lg:m-3 lg:p-2 md:m-4 md:p-3 m-3 p-2'>
            <ProductProvider>
                <Product currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
                <ProductItems setCurrentProduct={setCurrentProduct} />
            </ProductProvider>
        </div>
    )
}

export default ProductMain
