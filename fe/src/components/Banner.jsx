import React from 'react'

const Banner = () => {
    return (
        <div className="flex items-center justify-between w-[80vw]">
            <img
                className="w-[40vw] h-[40vh] object-cover rounded-2xl"
                src="https://res.cloudinary.com/dmnrgzhkv/image/upload/v1700273910/booking/922359-hd-l2-studios-sunseeker-phase-2-restaurant-c2-ppl_d7mm9j.jpg"
                alt="hotel" />

            <div className=' flex flex-col gap-4 text-right p-10'>
                <h1 className="text-black font-bold text-[24px]">
                    TẠI SAO<br />NÊN CHỌN CHÚNG TÔI?
                </h1>
                <p className="text-[#959595]">
                    Chúng tôi cung cấp danh sách những khách sạn hàng đầu<br /> tại nhiều địa điểm nổi tiếng khác nhau.
                    <br />
                    Với mức phí tốt nhất trong các ứng dụng khác.
                </p>
            </div>
        </div >
    )
}

export default Banner
