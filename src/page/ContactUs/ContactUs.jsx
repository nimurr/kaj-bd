import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useGetContactUsQuery, useUpdateContactUsMutation } from '../../redux/features/setting/settingApi';
import { message } from 'antd';

const ContactUs = () => {

    const { data, refetch } = useGetContactUsQuery();
    const fullData = data?.data?.attributes[0] || [];
    console.log(fullData)

    const [updateContactUs] = useUpdateContactUsMutation();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const number = e.target.number.value;
        const email = e.target.email.value;
        const detailsoverview = e.target.detailsoverview.value;
        const formData = {
            phoneNumber: number,
            email
        }

        try {

            const response = await updateContactUs(formData).unwrap();
            console.log(response);
            if (response?.code === 200) {
                message.success(response?.message);
                refetch()
            }

        } catch (error) {

        }


    }


    return (
        <div>
            <div className="flex justify-between items-center py-5">
                <Link to="/settings" className="flex gap-2 items-center">
                    <>
                        <FaArrowLeft className="text-2xl" />
                    </>
                    <h1 className="text-2xl font-semibold">Contact Us</h1>
                </Link>
            </div>
            <div className='grid lg:grid-cols-2 gpa-5 lg:gap-10'>
                <div className='bg-gray-100 p-5 lg:p-10 rounded-lg'>
                    <h2 className='my-5 text-2xl underline text-center'>Contact Details</h2>
                    <div>
                        <span className='font-semibold text-xl mb-2'>Eamil</span>
                        <h2>{fullData?.email}</h2>
                    </div>
                    <div className='mt-8'>
                        <span className='font-semibold text-xl mb-2'>Phone Number</span>
                        <h2>{fullData?.phoneNumber}</h2>
                    </div>
                    <div className='mt-8'>
                        <span className='font-semibold text-xl mb-2'>Details Overview</span>
                        <h2>{fullData?.detailsoverview || "Not Found"}</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='bg-gray-100 p-5 rounded-lg'>
                    <div>
                        <span className='font-semibold text-xl mb-2 block'>Eamil</span>
                        <input className='p-2 rounded-lg w-full ' placeholder='Enter Your Contact Email' type="text" name="email" id="" />
                    </div>
                    <div className='mt-2'>
                        <span className='font-semibold text-xl mb-2 block'>Phone Number</span>
                        <input className='p-2 rounded-lg w-full ' placeholder='Enter Your Contact Number' type="number" name="number" id="" />
                    </div>
                    <div className='mt-2'>
                        <span className='font-semibold text-xl mb-2 block'>Details Overview</span>
                        <textarea rows={4} name="detailsoverview" className='w-full p-2 rounded-lg' placeholder='Enter Your Details' id=""></textarea>
                    </div>
                    <div className='mt-5'>
                        <button className='py-2 px-8 rounded-lg bg-[#778beb] text-white'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;
