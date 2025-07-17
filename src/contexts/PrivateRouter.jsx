import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';


const PrivateRouter = ({ children }) => {
   const {user, loading} = useAuth()
     const location = useLocation()


    if(loading){
        return <Loader></Loader>
    }
    if(user && user?.email){
        return children;
    }
   return <Navigate state={location?.pathname} to='/login'></Navigate>
};

export default PrivateRouter;