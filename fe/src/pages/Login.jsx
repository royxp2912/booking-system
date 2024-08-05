import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import newAxios from "../hooks/newAxios.js";

const Login = () => {
    const [eye, setEye] = useState(false);
    const [type, setType] = useState("password");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [free, setFree] = useState(true);

    const navigate = useNavigate();

    const handelEye = () => {
        setType(eye ? "password" : "text");
        setEye(!eye);
    }

    const handelCheck = () => {
        if ((username.trim() === '')) {
            toast.error("Không đươc để trống trường Tài khoản!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return false;
        }

        if ((password.trim() === '')) {
            toast.error("Không đươc để trống trường Mật khẩu!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return false;
        }

        return true;
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        setFree(false);
        const userLogin = {
            username,
            password
        }
        if (handelCheck()) {
            try {
                const { data } = await newAxios.post("/auths/login", userLogin);
                localStorage.setItem("user", JSON.stringify(data.data));
                navigate("/", { replace: true });
            } catch (err) {
                console.log(err);
                setFree(true);
                toast.error(err?.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            }
        } else {
            setFree(true);
        }
    }

    return (
        <div className="login flex items-center justify-center w-[100vw] h-[80vh] flex-col gap-[10px]">
            <ToastContainer />
            <form onSubmit={handelSubmit} action="">
                <h1 className="title text-[24px] font-[600] mb-[30px] ml-2 tracking-[6px] text-center">ĐĂNG NHẬP</h1>
                <div className="container flex flex-col gap-4 ">
                    <input
                        type="text"
                        placeholder='Tài khoản'
                        onChange={(e) => setUsername(e.target.value)}
                        className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none" />

                    <div className='inputPass'>
                        <input
                            type={type}
                            placeholder='Mật khẩu'
                            onChange={(e) => setPassword(e.target.value)}
                            className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none relative" />
                        {
                            eye ?
                                <VisibilityOutlinedIcon className="iconE cursor-pointer absolute t-[-10px]" onClick={handelEye} /> :
                                <VisibilityOffOutlinedIcon className="iconE cursor-pointer absolute" onClick={handelEye} />
                        }
                    </div>

                    <button
                        disabled={!free}
                        className="submit p-[10px] bg-[#9bb6e7] rounded-[20px] text-white text-[20px] font-[600] tracking-[6px] hover:bg-[#6495ED]">
                        ĐĂNG NHẬP
                    </button>
                </div>
            </form>

            <div className='flex gap-[4px]'>
                Bạn chưa có tài khoản?
                <Link to="/register">
                    <p className='text-[#6495ED] hover:text-[#0b60ff]'>Đăng ký ngay</p>
                </Link>
            </div>
        </div>
    )
}

export default Login
