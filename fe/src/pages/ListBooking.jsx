import React from 'react';
import Booking from '../components/Booking';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getAllBookingByUserId } from '../redux/slices/booking.slice';

const ListBooking = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const bookings = useSelector((state) => state.booking)
    console.log(bookings);

    useEffect(() => {
        dispatch(getAllBookingByUserId(user._id));
    }, [])

    return (
        <div>
            <h1 className='font-bold text-[20px] mb-2'>Danh sách Booking:</h1>
            {
                bookings?.data?.map((booking, index) => (
                    <Booking info={booking} key={index} />
                ))
            }
        </div>
    )
}

export default ListBooking
