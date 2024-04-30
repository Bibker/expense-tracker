import React, { useEffect } from "react";
import "../Login/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/globalContext";

const Signup = () => {
  const { setName, setEmail, setPassword, handleSignup, token } =
    useGlobalContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

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
          <button onClick={handleSignup}>Sign Up</button>
        </div>

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
