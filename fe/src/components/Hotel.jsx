import React from 'react'
import { useNavigate } from 'react-router'

const Hotel = ({ info }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/hotels/${info._id}`)}
            className='flex flex-col gap-2 rounded-lg p-3 max-w-[320px] shadow-md hover:shadow-lg cursor-pointer'>
            <img
                className='w-[320px] h-[200px] object-fill rounded-lg'
                src={info.image}
            />
            <div className="flex items-center justify-between px-2">
                <h1 className="font-bold">{info.name}</h1>
                <p className="text-[#959595] font-medium text-[12px]">{info.city}</p>
            </div>
            <div className="flex items-center justify-between px-2">
                <p className="text-pink-500 font-medium text-[14px]">{info.type}</p>
                <p className="text-[#959595] font-medium text-[12px]">Còn trống: {info.totalRoomAvai}</p>
            </div>
        </div>
    )
}

export default Hotel
