import React from 'react';
import { AiFillInstagram } from "react-icons/ai"
import { BsFacebook } from 'react-icons/bs'

const Footer = () => {
    return (
        <div className='flex gap-10 items-center justify-between p-5 px-[200px] bg-gradient-to-r from-purple-500 to-pink-500 w-[100%] h-[240px] mb-[100px]'>
            <h1 className="text-[40px] font-bold text-white tracking-[6px]">BOOKING</h1>
            <div className='flex flex-col gap-2'>
                <h1 className="text-white text-[20px] mb-3">Liên hệ Quản Trị Viên</h1>
                <div className='flex justify-center gap-10'>
                    <AiFillInstagram className='bg-white p-[8px] h-[35px] w-[35px] rounded-full icon text-pink-500' />
                    <BsFacebook className='bg-white p-[8px] h-[35px] w-[35px] rounded-full icon text-pink-500' />
                </div>
            </div>
        </div>
    )
}

export default Footer
