import React, { useEffect } from "react";
import "../Login/login.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Context/globalContext";

const Signup = () => {
  const { setName, setEmail, setPassword, handleSignup } = useGlobalContext();

  useEffect(() => {}, []);

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Sign Up</h1>
        <div className='loginsignup-fields'>
          <input
            type='text'
            placeholder='Your Name'
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            type='email'
            placeholder='Email Address'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={handleSignup}>Sign Up</button>
        <p className='loginsignup-login'>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className='link'
          >
            <span>Login Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
