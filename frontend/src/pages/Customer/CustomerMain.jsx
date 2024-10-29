import { useState } from 'react';
import { CustomerProvider } from '../../contexts'
import Customer from './Customer';
import CustomerItems from './CustomerItems';

const CustomerMain = () => {

    const [currentCustomer, setCurrentCustomer] = useState([]);

    return (
        <div className='lg:m-3 lg:p-2 md:m-4 md:p-3 m-3 p-2'>
            <CustomerProvider>
                <Customer currentCustomer={currentCustomer} setCurrentCustomer={setCurrentCustomer} />
                <CustomerItems setCurrentCustomer={setCurrentCustomer} />
            </CustomerProvider>
        </div>
    )
}

export default CustomerMain
