import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <div className='flex flex-col gap-5'>
            <Header />
            <div className='flex items-center justify-center mt-10 mb-[200px]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
