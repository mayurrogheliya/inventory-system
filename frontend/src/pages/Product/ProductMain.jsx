import { useState } from 'react'
import { ProductProvider } from '../../contexts';
import { Outlet } from 'react-router-dom';

const ProductMain = () => {

    const [currentProduct, setCurrentProduct] = useState([]);

    return (
        <div className='lg:m-3 lg:p-2 md:m-4 md:p-3 m-3 p-2'>
            <ProductProvider>
                <Outlet context={{ currentProduct, setCurrentProduct }} />
            </ProductProvider>
        </div>
    )
}

export default ProductMain
