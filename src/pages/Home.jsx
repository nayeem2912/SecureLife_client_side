import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
    return (
        <div>
            <Helmet>
                <title>SecureLife | Home</title>
            </Helmet>
            <h1 className='text-black'>this is home</h1>
            <h1>this is home</h1>
            <h1>this is home</h1>
            <h1>this is home</h1>
            <h1>this is home</h1>
            <h1>this is home</h1>
            <h1>this is home</h1>
            <h1>this is home</h1>
            <h1>this is home</h1>
            <h1>this is home</h1>
            <h1>this is home</h1>
            <h1>this is home</h1>
            <h1>this is home</h1>
            <h1>this is home</h1>
        </div>
    );
};

export default Home;