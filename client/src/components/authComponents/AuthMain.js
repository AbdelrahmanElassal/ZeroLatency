import React from 'react';
import { useEffect , useState , useRef } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function AuthMain(){
    const [logFlag , setLogFlag] =  useState(false)


    return(
        <div className="video-container">
            {logFlag ? <LoginForm /> : <SignupForm />}
            <button onClick={()=>{setLogFlag((prevlogFlag)=>!prevlogFlag)}}>{logFlag ? 'Doesn\'t have an account?' : 'Already signed up!'}</button>
        </div>

    )
} 

export default AuthMain;