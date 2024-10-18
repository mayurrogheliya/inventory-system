import React, { useState } from 'react'
import Product from './Product'
import { ProductProvider } from '../contexts/ProductContext'
import ProductItems from './ProductItems';

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
