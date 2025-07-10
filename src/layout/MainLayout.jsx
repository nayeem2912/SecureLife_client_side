import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <>
        <Navbar></Navbar>
        <main className='min-h-[calc(100vh-325px)]'>
            <Outlet></Outlet>
        </main>
        <Footer></Footer>
        </>
    );
};

export default MainLayout;