import React from 'react';
import dayjs from 'dayjs';

const Booking = ({ info }) => {
    return (
        <div className='flex gap-10 p-4 items-center justify-betweeen w-[60vw] rounded-lg shadow-md hover:shadow-lg'>
            <img
                className='w-[300px] h-[200px]'
                src={info.room.images[0]}
                alt="Room" />
            <div className='flex gap-2 flex-col text-[16px] w-full'>
                <div className='flex justify-between'>
                    <h1>Khách sạn: {info.hotel.name}</h1>
                    <h1>Người Đặt: {info.user.fullName}</h1>
                </div>
                <div className='flex justify-between w-full '>
                    <h1>Tên Phòng: {info.room.name}</h1>

                    <p className='text-[14px] text-pink-500'>{info.room.type}</p>
                </div>

                <div className='flex justify-between text-[14px] w-full text-purple-500'>
                    <p>{info.hotel.city}</p>
                    <p>{info.hotel.location}</p>
                </div>
                <div className='flex justify-between text-[14px] w-full text-pink-500'>
                    <p className=''>{info.room.price} VNĐ / 1 đêm</p>
                    <p className=''>Phương thức thanh toán: {info.paymentMethod}</p>
                </div>
                <div className='flex justify-between text-[14px] w-full text-purple-500'>
                    <p className=''>Từ: {dayjs(info.from).format('YYYY-MM-DD')}</p>
                    <p className=''>Đến: {dayjs(info.to).format('YYYY-MM-DD')}</p>
                </div>
            </div>
        </div>
    )
}

export default Booking
