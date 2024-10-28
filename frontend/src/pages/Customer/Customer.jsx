/* eslint-disable react/prop-types */

import { useContext, useEffect, useRef, useState } from 'react';
import { CustomerContext } from '../../contexts/CustomerContext';
import { Country, State, City } from 'country-state-city';

const CustomerForm = ({ currentCustomer, setCurrentCustomer }) => {
    const { customers, addCustomer, updateCustomer } = useContext(CustomerContext);

    const [customerItems, setCustomerItems] = useState({
        name: '',
        email: '',
        phone: '',
        country: 'IN', // Default value for country
        state: 'GJ',   // Default value for state
        city: 'Rajkot', // Default value for city
        pincode: '',
        occupation: '',
        dob: '',
        gender: 'Male',
        address: '',
        image: ''
    });

    // country, state, city
    const [countryOptions, setCountryOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    useEffect(() => {
        setCountryOptions(Country.getAllCountries());
    }, []);

    useEffect(() => {
        if (customerItems.country) {
            setStateOptions(State.getStatesOfCountry(customerItems.country));
        }
    }, [customerItems.country]);

    useEffect(() => {
        if (customerItems.state) {
            setCityOptions(City.getCitiesOfState(customerItems.country, customerItems.state));
        }
    }, [customerItems.state]);

    const imageRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [pincodeError, setPincodeError] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isPincodeValid, setIsPincodeValid] = useState(true);

    useEffect(() => {
        if (currentCustomer) {
            setCustomerItems({
                ...currentCustomer,
                dob: currentCustomer.dob ? currentCustomer.dob.split('T')[0] : '',  // Format date for input
                gender: currentCustomer.gender || 'Male',
                image: ''
            });
            if (currentCustomer.image) {
                setImagePreview(`http://localhost:5000/${currentCustomer.image}`);
            } else {
                setImagePreview(null);
            }
        } else {
            setCustomerItems({ name: '', email: '', phone: '', country: 'IN', state: 'GJ', city: 'Rajkot', pincode: '', occupation: '', dob: '', gender: 'Male', address: '', image: '' });
            setImagePreview(null);
        }

        if (imageRef.current) {
            imageRef.current.value = '';
        }

    }, [currentCustomer]);

    // Function to check if the customer name already exists
    const doesNameExist = (name) => {
        return customers.some((customer) => customer.name.toLowerCase() === name.toLowerCase() && customer.id !== currentCustomer?.id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate name field
        if (!customerItems.name) {
            setNameError('Name is required.');
            return;
        } else {
            setNameError('');
        }

        // Check if name already exists
        if (doesNameExist(customerItems.name)) {
            setNameError('Customer Name already exists.');
            return; // Stop form submission
        } else {
            setNameError('');
        }

        // Check phone validation
        if (!isPhoneValid) {
            setPhoneError('Phone number must be exactly 10 digits and numeric.');
            return;
        } else {
            setPhoneError('');
        }

        if (!isPincodeValid) {
            setPincodeError('Pincode must be exactly 6 digits and numeric.');
            return;
        } else {
            setPincodeError('');
        }

        const formData = new FormData();

        Object.entries(customerItems).forEach(([key, value]) => formData.append(key, value));

        if (currentCustomer?.id) {
            await updateCustomer(currentCustomer.id, formData);
        } else {
            await addCustomer(formData);
        }

        // Reset form after submission
        setCustomerItems({ name: '', email: '', phone: '', country: 'IN', state: 'GJ', city: 'Rajkot', pincode: '', occupation: '', dob: '', gender: 'Male', address: '', image: '' });
        setCurrentCustomer(null);
        setImagePreview(null);
    };

    useEffect(() => {
        if (countryOptions.length > 0) {
            setCustomerItems((prevItems) => ({
                ...prevItems,
                country: 'IN', // or another preferred default
            }));
        }
    }, [countryOptions]);

    useEffect(() => {
        if (stateOptions.length > 0) {
            setCustomerItems((prevItems) => ({
                ...prevItems,
                state: 'GJ', // or another preferred default
            }));
        }
    }, [stateOptions]);

    useEffect(() => {
        if (cityOptions.length > 0) {
            setCustomerItems((prevItems) => ({
                ...prevItems,
                city: 'Rajkot', // or another preferred default
            }));
        }
    }, [cityOptions]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setCustomerItems((prevItems) => ({
            ...prevItems,
            [name]: value,
        }));

        // Phone validation
        if (name === 'phone') {
            const isValid = value === '' || /^\d{10}$/.test(value);
            setIsPhoneValid(isValid);
            setPhoneError(isValid ? '' : 'Phone number must be exactly 10 digits and numeric.');
        }

        // Pincode validation
        if (name === 'pincode') {
            const isValid = value === '' || /^\d{6}$/.test(value);
            setIsPincodeValid(isValid);
            setPincodeError(isValid ? '' : 'Pincode must be exactly 6 digits and numeric.');
        }

        // Reset dependent selections if necessary
        if (name === 'country') {
            setCustomerItems((prevItems) => ({ ...prevItems, state: '', city: '' }));
        } else if (name === 'state') {
            setCustomerItems((prevItems) => ({ ...prevItems, city: '' }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
            setCustomerItems((prevItems) => ({ ...prevItems, image: file }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <div className='md:m-5 md:p-4 sm:m-4 sm:p-3 m-3 p-2'>
                <h1 className='font-bold sm:text-3xl text-2xl'>{customerItems.id ? 'Update Customer' : "Add Customer"}</h1>
                <form className='grid grid-cols-1 md:grid-cols-3 w-full my-3 gap-y-4 gap-x-3' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={customerItems.name} onChange={handleOnChange} className={`border py-1 px-2 focus:outline-none w-full rounded-md ${nameError ? 'border-red-400' : 'border-gray-300'}`} autoFocus />
                        {nameError && <p className='text-red-500 text-sm'>{nameError}</p>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={customerItems.email} onChange={handleOnChange} className='border py-1 px-2 focus:outline-none w-full rounded-md border-gray-300' />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" id="phone" value={customerItems.phone} onChange={handleOnChange} className={`border py-1 px-2 focus:outline-none w-full rounded-md ${isPhoneValid ? 'border-gray-300' : 'border-red-400'}`} />
                        {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
                    </div>
                    <div>
                        <label htmlFor="country">Country</label>
                        <select
                            name="country"
                            value={customerItems.country}
                            onChange={handleOnChange}
                            className="border py-1 px-2 w-full rounded-md border-gray-300"
                        >
                            {countryOptions.map((country) => (
                                <option key={country.isoCode} value={country.isoCode}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="state">State</label>
                        <select
                            name="state"
                            value={customerItems.state}
                            onChange={handleOnChange}
                            className="border py-1 px-2 w-full rounded-md border-gray-300"
                        >
                            {stateOptions.map((state) => (
                                <option key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <select
                            name="city"
                            value={customerItems.city}
                            onChange={handleOnChange}
                            className="border py-1 px-2 w-full rounded-md border-gray-300"
                        >
                            {cityOptions.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pincode">Pincode</label>
                        <input type="text" name="pincode" id="pincode" value={customerItems.pincode} onChange={handleOnChange} className={`border py-1 px-2 focus:outline-none w-full rounded-md ${isPincodeValid ? 'border-gray-300' : 'border-red-400'}`} />
                        {pincodeError && <p className="text-red-500 text-sm">{pincodeError}</p>}
                    </div>
                    <div>
                        <label htmlFor="occupation">Occupation</label>
                        <input type="text" name="occupation" id="occupation" value={customerItems.occupation} onChange={handleOnChange} className='border py-1 px-2 focus:outline-none w-full rounded-md border-gray-300' />
                    </div>
                    <div>
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" name="dob" id="dob" value={customerItems.dob} max={new Date().toISOString().split("T")[0]} onChange={handleOnChange} className='border py-1 px-2 focus:outline-none w-full rounded-md border-gray-300' />
                    </div>
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <div className='flex gap-4'>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={customerItems.gender === 'Male'}
                                    onChange={handleOnChange}
                                    className="mr-1"
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={customerItems.gender === 'Female'}
                                    onChange={handleOnChange}
                                    className="mr-1"
                                />
                                Female
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Other"
                                    checked={customerItems.gender === 'Other'}
                                    onChange={handleOnChange}
                                    className="mr-1"
                                />
                                Other
                            </label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <textarea name="address" id="address" value={customerItems.address} onChange={handleOnChange} className='border py-1 px-2 focus:outline-none w-full rounded-md border-gray-300'></textarea>
                    </div>

                    {/* Image upload */}
                    <div>
                        <label htmlFor="image">Upload Image</label>
                        <input type="file" name="image" id="image" ref={imageRef} onChange={handleImageChange} className='bg-gray-100 w-full rounded-md p-2 border border-gray-300 focus:outline-none hover:cursor-pointer' accept='.jpeg, .jpg, .png' />
                        {imagePreview && (
                            <img src={imagePreview} alt='Preview' className='w-12 h-12 mt-2' />
                        )}
                    </div>

                    {/* Submit button */}
                    <div>
                        <button type='submit' className='bg-blue-600 w-full sm:w-auto text-white self-start py-1 px-4 mt-3 text-lg rounded-lg hover:bg-blue-700'>
                            {customerItems.id ? 'Update Customer' : 'Add Customer'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CustomerForm;