import React from 'react';
import { useNavigate } from 'react-router';

const Room = ({ info }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/hotels/${info.hotel._id}/rooms/${info._id}`, { replace: true })}
            className='flex flex-col gap-2 rounded-lg p-3 max-w-[320px] shadow-md hover:shadow-lg cursor-pointer'>
            <img
                className='w-[320px] h-[200px] object-fill rounded-lg'
                src={info ? info.images[0] : "https://res.cloudinary.com/dmnrgzhkv/image/upload/v1700251892/booking/Hotel-7-Dublin-family-room-with-2-double-beds_qzxjfp.jpg"}
                alt="Room"
            />
            <div className="flex items-center justify-between px-2">
                <h1 className="font-bold">{info.name}</h1>
                <p className="text-pink-500 font-medium text-[12px]">{info.price} VNĐ / 1đêm</p>
            </div>
            <div className="flex items-center justify-between px-2">
                <p className="text-pink-500 font-medium text-[14px]">{info.type}</p>
                <p className="text-[#959595] font-medium text-[12px]">Dành cho: {info.maxPeopel} người</p>
            </div>
        </div>
    )
}

export default Room
