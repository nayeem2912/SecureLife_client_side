import React from 'react';

const Logo = () => {
    return (
        <div className='flex  items-center'>
            <img className='mb-1.5 mr-1.5 w-12 h-12' src="../../favicon.svg" alt="" />
            <h1 className='md:text-xl text-lg  mt-5 -ml-2  lg:text-2xl font-bold bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent'>Secure <span className=''>Life</span></h1>
        </div>
    );
};

export default Logo;