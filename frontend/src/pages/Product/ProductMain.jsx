import { useState } from 'react'
import Product from './Product'
import ProductItems from './ProductItems';
import { ProductProvider } from '../../contexts';

const ProductMain = () => {

    const [currentProduct, setCurrentProduct] = useState([]);

    return (
        <div>
            <ProductProvider>
                <Product currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
                <ProductItems setCurrentProduct={setCurrentProduct} />
            </ProductProvider>
        </div>
    )
}

export default ProductMain
