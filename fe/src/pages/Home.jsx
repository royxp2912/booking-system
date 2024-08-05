import React from 'react';
import Room from '../components/Room';
import Hotel from '../components/Hotel';
import Banner from '../components/Banner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from '../redux/slices/hotel.slice';
import { getAllRooms } from '../redux/slices/room.slice';

const Home = () => {
    const dispatch = useDispatch();
    const hotels = useSelector((state) => state.hotel);
    const rooms = useSelector((state) => state.room);

    useEffect(() => {
        dispatch(getAllHotels());
        dispatch(getAllRooms());
    }, []);

    return (
        <div className="flex flex-col gap-10 items-center justify-center">
            <div className="mt-10 mb-[100px]">
                <h1 className="font-bold text-[18px] ml-4 mb-4">TOP</h1>
                <div className="flex gap-4">
                    {
                        hotels?.data?.map((hotel) =>
                            <Hotel info={hotel} key={hotel._id} />
                        )
                    }
                </div>
            </div>
            <Banner />

            <div className="mt-[100px]">
                <h1 className="font-bold text-[18px] ml-4 mb-4">NEW ROOM</h1>
                <div className="flex gap-4">
                    {
                        rooms?.data?.map((room) =>
                            <Room info={room} key={room._id} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
