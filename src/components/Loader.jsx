import React from 'react';

const Loader = () => {
    return (
        <div>
             <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-70 z-50">
        <div className="loader"><span className="loading loading-bars text-center flex justify-center items-center loading-xl"></span></div>
      </div>
        </div>
    );
};

export default Loader;