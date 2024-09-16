import React from "react";
import { useState } from "react";


function SignupForm(){

    const [signupCred , setSignupCred] = useState({
        firstname : "",
        lastname : "",
        username : "",
        email : "",
        password : "",
        confirmPassword : ""
    })

    const [message , setMessage] = useState('') 

    const handleSignupChange = (e) => {
        setSignupCred({...signupCred, [e.target.id] : e.target.value});
        setMessage('')
        console.log(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (signupCred.password !== signupCred.confirmPassword){
            setMessage("password and confirm password are not the same");
            return;
        }

        try{
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(signupCred)
              });
              const res = await response.json()
              if(response.status === 201){
                setMessage("success")
                console.log(document.cookies)
              }
              else if(response.status === 400){
                setMessage(res.errors);
              }
        }catch(error){
            console.error(error);
            setMessage("Failed to sign up. Please try again later.");
            return;
        }

    }
    return (
        <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="input-group">
                <label htmlFor="firstname">firstname</label>
                <input type="text" id="firstname" placeholder="Enter your firstname" required onChange={handleSignupChange} />
            </div>
            <div className="input-group">
                <label htmlFor="lastname">lastname</label>
                <input type="text" id="lastname" placeholder="Enter your lastname" required onChange={handleSignupChange} />
            </div>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter your username" required onChange={handleSignupChange} />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required onChange={handleSignupChange} />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required onChange={handleSignupChange} />
            </div>
            <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm your password" required onChange={handleSignupChange} />
            </div>
            <div className="input-group">
                <h3>{message}</h3>
            </div>
            <button type="submit" className="btn-signup">Sign Up</button>
        </form>

    </div>
    );
}


export default SignupForm;