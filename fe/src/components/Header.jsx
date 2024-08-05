import Search from './Search';
import React, { Fragment } from 'react';
import newAxios from "../hooks/newAxios";
import { useNavigate } from 'react-router-dom';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handelLogout = async () => {
        try {
            const { data } = await newAxios.delete("/auths/logout");
            localStorage.clear();
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col gap-8 py-5 px-[200px] bg-gradient-to-r from-purple-500 to-pink-500 w-[100%] h-[160px]">
            <div className="flex items-center justify-between">
                <h1
                    onClick={() => navigate("/", { replace: true })}
                    className="text-[20px] font-bold text-white tracking-[6px] cursor-pointer">BOOKING</h1>
                {
                    user ?
                        <div className="flex items-center gap-4">
                            <h1
                                onClick={() => navigate("/profile", { replace: true })}
                                className='text-white cursor-pointer'>Xin chào, {user.fullName}</h1>
                            <button
                                onClick={handelLogout}
                                className="bg-white font-medium text-pink-500 hover:bg-pink-100 px-2 py-1 rounded-md">Đăng xuất</button>
                            <div
                                onClick={() => navigate("/bookings", { replace: true })}
                                className='grid place-items-center bg-white rounded-md cursor-pointer h-[32px] w-[32px]'>
                                <StickyNote2Icon className='text-purple-500' />
                            </div>
                        </div>
                        :
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-white font-medium text-pink-500 hover:bg-pink-100 px-2 py-1 rounded-md">Đăng kí</button>
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-white font-medium text-pink-500 hover:bg-pink-100 px-2 py-1 rounded-md">Đăng nhập</button>
                        </div>
                }
            </div>
            <Search />
        </div>
    )
}

export default Header
