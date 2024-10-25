import { useState } from 'react';
import { CustomerProvider } from '../../contexts'
import Customer from './Customer';
import CustomerItems from './CustomerItems';

const CustomerMain = () => {

    const [currentCustomer, setCurrentCustomer] = useState([]);

    return (
        <div>
            <CustomerProvider>
                <Customer currentCustomer={currentCustomer} setCurrentCustomer={setCurrentCustomer} />
                <CustomerItems setCurrentCustomer={setCurrentCustomer} />
            </CustomerProvider>
        </div>
    )
}

export default CustomerMain
