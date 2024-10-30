import { useState } from 'react';
import { CustomerProvider } from '../../contexts'
import { Outlet } from 'react-router-dom';

const CustomerMain = () => {

    const [currentCustomer, setCurrentCustomer] = useState([]);

    return (
        <div className='lg:m-3 lg:p-2 md:m-4 md:p-3 m-3 p-2'>
            <CustomerProvider>
                <Outlet context={{ currentCustomer, setCurrentCustomer }} />
            </CustomerProvider>
        </div>
    )
}

export default CustomerMain
