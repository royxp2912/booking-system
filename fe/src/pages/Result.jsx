import React from 'react';
import Hotel from "../components/Hotel";
import { useSelector } from "react-redux";


const Result = () => {
    const hotels = useSelector((state) => state.hotel);
    return (
        <div className="flex flex-col gap-10 items-center justify-center">
            {
                hotels.data.length === 0 ? (
                    <h1 className='text-pink-500 text-[20px]'>Không tìm thấy khách sạn phù hợp với từ khóa!</h1>
                )
                    :
                    (
                        <div className="mt-10 mb-[100px]">
                            <h1 className="font-bold text-[18px] ml-4 mb-4">Kết quả tìm kiếm:</h1>
                            <div className="flex gap-4">
                                {
                                    hotels?.data?.map((hotel) =>
                                        <Hotel info={hotel} key={hotel._id} />
                                    )
                                }
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Result
