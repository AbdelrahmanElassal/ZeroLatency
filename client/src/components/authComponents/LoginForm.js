import React from "react";
import { useState } from "react";


function LoginForm(){

    const [loginCred , setLoginCred] = useState({email : "", password : ""});
    const [message , setMessage] = useState('') 

    const handleLoginChange = (e) => {
        setLoginCred({...loginCred, [e.target.id] : e.target.value});
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try{
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(loginCred)
              });
              const res = await response.json()
              if(response.status === 201){
                setMessage(res.streamer)
                console.log(document.cookie)
              }
              else if(response.status === 404){
                setMessage("Data is Wrong");
              }
        }catch(error){
            console.error(error);
            setMessage("Failed to log in. Please try again later.");
            return;
        }

    }


    return(
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required onChange={handleLoginChange} />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required onChange={handleLoginChange} />
            </div>
            <div className="input-group">
                <h3>{message}</h3>
            </div>
            <button type="submit" className="btn-login">Login</button>
        </form>
    </div>
    );
}

export default LoginForm;