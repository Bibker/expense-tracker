import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Context/globalContext";
import "./login.css";

const Login = () => {
  const { setEmail, setPassword, handleLogin } = useGlobalContext();

  return (
    <>
      <div>
        <div className="loginsignup">
          <div className="loginsignup-container">
            <h1>Login</h1>
            <div className="loginsignup-fields">
              <input
                type="email"
                placeholder="Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button onClick={handleLogin}>Login</button>
            </div>

            <p className="loginsignup-login">
              Create an account?{" "}
              <Link to={"/signup"} className="link">
                <span>Create account</span>
              </Link>
            </p>
            <p className="forget-password">
              Forget Password?{" "}
              <Link to={"/forget-password"} className="link">
                <span>Reset Password</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
