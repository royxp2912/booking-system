import React, { useState } from 'react';
import { toast } from 'react-toastify';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useDispatch } from 'react-redux';
import newAxios from '../hooks/newAxios';

const ChangePassword = ({ userID, setEnable }) => {
    const dispatch = useDispatch();
    const [rePass, setRePass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [oldPass, setOldPass] = useState("");

    const [eyeOld, setEyeOld] = useState(false);
    const [typeOld, setTypeOld] = useState("password");
    const [eyeNew, setEyeNew] = useState(false);
    const [typeNew, setTypeNew] = useState("password");
    const [eyeRe, setEyeRe] = useState(false);
    const [typeRe, setTypeRe] = useState("password");
    const handelEyeOld = () => {
        setTypeOld(eyeOld ? "password" : "text");
        setEyeOld(!eyeOld);
    }
    const handelEyeNew = () => {
        setTypeNew(eyeNew ? "password" : "text");
        setEyeNew(!eyeNew);
    }
    const handelEyeRe = () => {
        setTypeRe(eyeRe ? "password" : "text");
        setEyeRe(!eyeRe);
    }

    const handelCheck = () => {
        if ((oldPass.trim() === '')) {
            toast.error("Không được để trống Mât khẩu cũ!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
            });
            return false;
        }

        if ((newPass.trim() === '')) {
            toast.error("Không được để trống Mât khẩu mới!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
            });
            return false;
        }

        if ((rePass.trim() === '')) {
            toast.error("Không được để trống nhập lại Mât khẩu mới!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
            });
            return false;
        }

        if (newPass !== rePass) {
            toast.error("Mât khẩu mới không trùng khớp!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
            });
            return false;
        }

        return true;
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const updated = {
            userID,
            oldPass,
            newPass,
        };

        if (handelCheck()) {
            try {
                await newAxios.patch(`/users/updatePass`, updated);
                toast.success("Cập nhật mật khẩu Người dùng thành công !", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                });
                setEnable(false);
            } catch (err) {
                console.log("Err in create: ", err);
                toast.error(err?.response?.data?.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                });
            }
        }
    };

    return (
        <div className='absolute bg-white shadow-md hover:shadow-lg p-10'>
            <button
                onClick={() => setEnable(false)}
                className='absolute top-2 right-2 hover:text-pink-500'>Hủy</button>
            <h1 className="title text-[24px] font-[600] ml-2 tracking-[6px] text-center mb-5">ĐỔI MẬT KHẨU</h1>
            <form onSubmit={handleChangePassword} action="">
                <div className='flex flex-col gap-5 items-center justify-center '>
                    <div>
                        <input
                            type={typeOld}
                            placeholder='Nhập mật khẩu cũ'
                            onChange={(e) => setOldPass(e.target.value)}
                            className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none relative" />
                        {
                            eyeOld ?
                                <VisibilityOutlinedIcon className="iconE cursor-pointer" onClick={handelEyeOld} /> :
                                <VisibilityOffOutlinedIcon className="iconE cursor-pointer" onClick={handelEyeOld} />
                        }
                    </div>
                    <div>
                        <input
                            type={typeNew}
                            placeholder='Nhập mật khẩu mới'
                            onChange={(e) => setNewPass(e.target.value)}
                            className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none relative" />
                        {
                            eyeNew ?
                                <VisibilityOutlinedIcon className="iconE cursor-pointer" onClick={handelEyeNew} /> :
                                <VisibilityOffOutlinedIcon className="iconE cursor-pointer" onClick={handelEyeNew} />
                        }
                    </div>
                    <div>
                        <input
                            type={typeRe}
                            placeholder='Nhập lại mật khẩu mới'
                            onChange={(e) => setRePass(e.target.value)}
                            className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none relative" />
                        {
                            eyeRe ?
                                <VisibilityOutlinedIcon className="iconE cursor-pointer" onClick={handelEyeRe} /> :
                                <VisibilityOffOutlinedIcon className="iconE cursor-pointer" onClick={handelEyeRe} />
                        }
                    </div>
                    <button
                        className="submit w-full mt-5 p-[10px] bg-gradient-to-r from-purple-300 to-pink-300 
                    hover:from-purple-500 hover:to-pink-500
                    rounded-[20px] text-white text-[20px] font-[600] tracking-[6px]">
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword