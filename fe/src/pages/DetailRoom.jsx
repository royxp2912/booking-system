import dayjs from 'dayjs';
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { getRoomById } from '../redux/slices/room.slice';
import { createBooking } from '../redux/slices/booking.slice';
import { ToastContainer, toast } from 'react-toastify';

const DetailRoom = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roomId = useParams().roomID;
    console.log("roomId: ", roomId);
    const hotelId = useParams().hotelID;
    const user = localStorage.getItem("user");
    const room = useSelector((state) => state.room.detail);

    useEffect(() => {
        dispatch(getRoomById(roomId));
    }, [])
    const [curImg, setCurImg] = useState(0);
    const [to, setTo] = useState(dayjs(new Date()).format('YYYY/MM/DD'));
    const [from, setFrom] = useState(dayjs(new Date()).format('YYYY/MM/DD'));

    const handleBooking = () => {
        if (!user) {
            navigate("/login", { replace: true });
        }
        const booking = {
            user: JSON.parse(user)._id,
            hotel: hotelId,
            room: roomId,
            from,
            to,
        }

        try {
            dispatch(createBooking(booking));
            toast.success("Đã Đặt Phòng Thành Công !", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
            });
        } catch (err) {
            console.log("Err in create: ", err);
            toast.error(err?.response?.data?.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
            });
        }
    }

    return (
        <div className="flex justify-between gap-10 mx-[100px] w-[80vw]">
            <ToastContainer />
            <div className='flex flex-col gap-2 items-center w-[50vw]'>
                <img
                    className="w-[340px] h-[300px] object-fill rounded-lg"
                    src={room.images && room.images[curImg]}
                    alt="Hotel" />
                <div className='flex gap-2'>
                    {
                        room && room.images && room?.images?.map((image, index) => (
                            <img
                                key={index}
                                onClick={() => setCurImg(index)}
                                className="w-[100px] h-[80px] object-fill rounded-lg cursor-pointer"
                                src={image}
                                alt="Hotel" />
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <div className="flex items-center justify-between">
                    <h1 className="text-[20px] font-bold">{room?.name}</h1>
                    <p className="text-[16px] text-pink-500">{room?.type}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-[16px] text-purple-500">{room?.hotel?.city}</p>
                    <p className="text-[14px] text-purple-500 text-justify">{room?.hotel?.location}</p>
                </div>
                <p className="text-[14px] text-gray-500 text-justify">
                    {room.desc}
                </p>
                <div className='flex justify-between'>
                    <p className='text-pink-500'>Tối đa: {room?.maxPeopel} người</p>
                    <p className='text-pink-500'>{room?.price} VNĐ / 1 đêm</p>
                </div>
                <div className='flex gap-5 justify-around mt-5'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="YYYY/MM/DD"
                            defaultValue={dayjs(from, 'YYYY/MM/DD')}
                            onChange={(e) => setFrom(dayjs(e.$d).format('YYYY/MM/DD'))} />

                        <DatePicker
                            format="YYYY/MM/DD"
                            defaultValue={dayjs(to, 'YYYY/MM/DD')}
                            onChange={(e) => setTo(dayjs(e.$d).format('YYYY/MM/DD'))} />
                    </LocalizationProvider>
                    <button
                        onClick={handleBooking}
                        className="text-white font-medium px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500"
                    >Đặt Phòng</button>
                </div>
            </div>
        </div>
    )
}

export default DetailRoom
