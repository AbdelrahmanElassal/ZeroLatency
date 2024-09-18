import React from 'react';
import { useContext } from'react';
import { AuthContext } from '../App';
import { Navigate } from 'react-router-dom';

function UserComponent(){
    const {isLoggedIn}= useContext(AuthContext)
    if(isLoggedIn===false){
        return (
            <Navigate to="/auth" />  
        );
    }

    return (
        <div>
            <h1>Welcome User!!!</h1>
        </div>
    );
}



export default UserComponent;