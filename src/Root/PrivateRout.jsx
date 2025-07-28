import React, { use } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Navigate } from 'react-router';
import Loading from '../Component/Loading';

const PrivateRout = ({children}) => {
    const {user,loading}=use(AuthContext)
    // console.log(user)
    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
        return children
    }
    return <Navigate to="/login" ></Navigate>
};

export default PrivateRout;