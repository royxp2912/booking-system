import React, { useEffect } from 'react';
import Room from '../components/Room';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRoomsByHoltelId } from '../redux/slices/room.slice';
import { getHotelById } from '../redux/slices/hotel.slice';

const DetailHotel = () => {
    const dispatch = useDispatch();
    const holId = useParams().hotelID;
    const rooms = useSelector((state) => state.room);
    const hotel = useSelector((state) => state.hotel.detail);

    useEffect(() => {
        dispatch(getHotelById(holId));
        dispatch(getAllRoomsByHoltelId(holId));
    }, [])

    return (
        <div className="flex flex-col gap-10">
            <div className="flex gap-10 mx-[100px] w-[80vw]">
                <img
                    className="w-[500px] h-[300px] object-fill rounded-lg"
                    src={hotel.image}
                    alt="Hotel" />
                <div className='flex flex-col gap-4 '>
                    <div className="flex items-center justify-between">
                        <h1 className="text-[20px] font-bold">{hotel.name}</h1>
                        <p className="text-[16px] text-pink-500">{hotel.type}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-[16px] text-purple-500">{hotel.city}</p>
                        <p className="text-[14px] text-purple-500 text-justify">{hotel.location}</p>
                    </div>
                    <p className="text-[14px] text-gray-500 text-justify">{hotel.desc}</p>
                </div>
            </div>

            {
                rooms?.data[0] ? (
                    <div>
                        <h1 className="ml-[100px] mb-[20px] font-bold text-[18px]">PHÒNG CÒN TRỐNG CỦA KHÁCH SẠN</h1>
                        <div className="flex items-center justify-center gap-4">
                            {
                                rooms?.data?.map((room) =>
                                    <Room info={room} key={room._id} />
                                )
                            }
                        </div>
                    </div>
                )
                    :
                    (<h1 className='text-pink-500 mt-10 text-center text-[20px]'>KHÁCH SẠN NÀY KHÔNG CÒN PHÒNG TRỐNG</h1>)
            }
        </div>
    )
}

export default DetailHotel
