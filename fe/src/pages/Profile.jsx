import { useEffect } from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUserById } from '../redux/slices/user.slice';
import ChangePassword from '../components/ChangePassword';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userID = JSON.parse(localStorage.getItem("user"))._id;
    const user = useSelector((state) => state.user.detail);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [enable, setEnable] = useState(false);
    const [username, setUsername] = useState("");

    if (!userID) {
        navigate("/login", { replace: tru });
    };
    useEffect(() => {
        dispatch(getUserById(userID));
        setName(user.fullName);
        setEmail(user.email);
        setPhone(user.phone);
        setUsername(user.username);
    }, [])

    const handelUpdateUser = (e) => {
        e.preventDefault();
        const updated = {
            userID,
            fullName: name,
            username,
            email,
            phone,
        };
        try {
            dispatch(updateUserById(updated));
            toast.success("Cập nhật thông tin Người dùng thành công !", {
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
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <ToastContainer />
            <form onSubmit={handelUpdateUser} action="">
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center'>
                        <p className='w-[180px] text-pink-500 font-medium'>Tên Người Dùng:</p>
                        <input
                            className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text" />
                    </div>
                    <div className='flex items-center'>
                        <p className='w-[180px] text-pink-500 font-medium'>Tên Tài Khoản:</p>
                        <input
                            className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" />
                    </div>
                    <div className='flex items-center'>
                        <p className='w-[180px] text-pink-500 font-medium'>Email:</p>
                        <input
                            className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text" />
                    </div>
                    <div className='flex items-center'>
                        <p className='w-[180px] text-pink-500 font-medium'>Phone:</p>
                        <input
                            className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text" />
                    </div>
                    <button
                        className="submit mt-5 p-[10px] bg-gradient-to-r from-purple-300 to-pink-300 
                    hover:from-purple-500 hover:to-pink-500
                    rounded-[20px] text-white text-[20px] font-[600] tracking-[6px]">
                        Lưu
                    </button>

                </div>
            </form>
            <button
                onClick={() => setEnable(true)}
                className="mt-5 w-full p-[10px] bg-gradient-to-r from-purple-300 to-pink-300 
                    hover:from-purple-500 hover:to-pink-500
                    rounded-[20px] text-white text-[20px] font-[600] tracking-[6px]">
                Đổi Mật Khẩu
            </button>
            {
                enable && <ChangePassword userID={userID} setEnable={setEnable} />
            }
        </div>

    )
}

export default Profile
