import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import newAxios from "../hooks/newAxios";

const Register = () => {
    const [eye1, setEye1] = useState(false);
    const [type1, setType1] = useState("password");

    const [eye2, setEye2] = useState(false);
    const [type2, setType2] = useState("password");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [free, setFree] = useState(true);

    const navigate = useNavigate();

    const handelEye1 = () => {
        setType1(eye1 ? "password" : "text");
        setEye1(!eye1);
    }

    const handelEye2 = () => {
        setType2(eye2 ? "password" : "text");
        setEye2(!eye2);
    }

    const handelCheck = () => {
        if ((username.trim() === '')) {
            toast.error("Không được để trống trường Tên tài khoản!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return false;
        }

        if ((email.trim() === '')) {
            toast.error("Không được để trống trường Email!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return false;
        }

        if ((name.trim() === '')) {
            toast.error("Không được để trống trường Họ và tên!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return false;
        }

        if ((phone.trim() === '')) {
            toast.error("Không được để trống trường Số điện thoại!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return false;
        }

        if ((password.trim() === '')) {
            toast.error("Không được để trống trường Mât khẩu!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return false;
        }

        if ((repassword.trim() === '')) {
            toast.error("Vui lòng nhâp lại mật khẩu!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            return false;
        }

        if (password !== repassword) {
            toast.error("Mât khẩu không trùng khớp!", {
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
        const newUser = {
            username,
            email,
            password,
            fullName: name,
            phone,
        }

        if (handelCheck()) {
            try {
                const { data } = await newAxios.post("/auths/register", newUser);
                toast.success("Đăng ký thành công !", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                navigate("/login", { replace: true });
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
        <div className="register flex items-center justify-center w-[100vw] h-[100vh] flex-col gap-[10px]">
            <ToastContainer />
            <form onSubmit={handelSubmit} action="">
                <h1 className="title text-[24px] font-[600] mb-[24px] ml-2 tracking-[6px] text-center">ĐĂNG KÝ</h1>
                <div className="container flex flex-col gap-4 ">
                    <input
                        type="text"
                        placeholder='Tên Tài Khoản'
                        onChange={(e) => setUsername(e.target.value)}
                        className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none" />

                    <input
                        type="email"
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none" />

                    <input
                        type="text"
                        placeholder='Ho và tên'
                        onChange={(e) => setName(e.target.value)}
                        className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none" />

                    <input
                        type="text"
                        placeholder='Số điện thoại'
                        onChange={(e) => setPhone(e.target.value)}
                        className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none" />

                    <div className='inputPass'>
                        <input
                            type={type1}
                            placeholder='Mật khẩu'
                            onChange={(e) => setPassword(e.target.value)}
                            className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none" />
                        {
                            eye1 ?
                                <VisibilityOutlinedIcon className="iconE cursor-pointer absolute t-[-10px]" onClick={handelEye1} /> :
                                <VisibilityOffOutlinedIcon className="iconE cursor-pointer absolute" onClick={handelEye1} />
                        }
                    </div>

                    <div className='inputPass'>
                        <input
                            type={type2}
                            placeholder='Nhập lại mật khẩu'
                            onChange={(e) => setRepassword(e.target.value)}
                            className="input border-b-2 px-3 py-2 w-[320px] focus:border-b-2 focus:border-[#6495ED] focus:outline-none" />
                        {
                            eye2 ?
                                <VisibilityOutlinedIcon className="iconE cursor-pointer" onClick={handelEye2} /> :
                                <VisibilityOffOutlinedIcon className="iconE cursor-pointer" onClick={handelEye2} />
                        }
                    </div>

                    <button
                        disabled={!free}
                        className="submit p-[10px] bg-[#9bb6e7] rounded-[20px] text-white text-[20px] font-[600] tracking-[6px] hover:bg-[#6495ED]">
                        ĐĂNG KÝ
                    </button>
                </div>
            </form>

            <div className='flex gap-[4px]'>
                Bạn đã có tài khoản?
                <Link to="/login">
                    <p className='text-[#6495ED] hover:text-[#0b60ff]'>Đăng nhâp ngay</p>
                </Link>
            </div>
        </div>
    )
}

export default Register