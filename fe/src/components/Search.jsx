import React, { useState } from 'react';
import CottageIcon from '@mui/icons-material/Cottage';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import { getHotelByKeyword } from '../redux/slices/hotel.slice';

const Search = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const handelSearch = () => {
        dispatch(getHotelByKeyword(keyword));
        navigate("/search", { replace: true });
    }
    return (
        <div className="flex mx-[200px] gap-8 items-center justify-between bg-white px-2 py-2 rounded-md">
            <div className="ml-5 relative w-full">
                <LocationOnIcon className='text-purple-500 absolute left-[-20px] top-2' />
                <input
                    type="text"
                    placeholder='Bạn muốn đi đến đâu?'
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    className="focus:outline-none p-2  w-full"
                />
            </div>
            <button
                onClick={handelSearch}
                className="text-white font-medium px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500"
            >
                Tìm
            </button>
        </div>
    )
}

export default Search
