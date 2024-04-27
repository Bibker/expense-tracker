import React from "react";
import "./ResetPassword.css";
import { useGlobalContext } from "../../Context/globalContext";
import { Link } from "react-router-dom";
import { invalid } from "../../utils/icons";

function ResetPassword() {
  const { setPassword, handleLogin } = useGlobalContext();

  return (
    <>
      <div>
        <div className='resetpassword'>
          <div className='resetpassword-container'>
            <h1>Create a new password</h1>
            <div className='resetpassword-fields'>
              <input
                type='password'
                placeholder='Password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                type='password'
                placeholder='Confirm Password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button onClick={handleLogin}>Save</button>
          </div>
        </div>

        <div className='valid-link'>
          <div className='resetpassword-container'>
            <h1>{invalid} This link is not valid.</h1>
            <div className='invalid'></div>

            <p className='resetpassword-resend'>
              Resend Link?{" "}
              <Link
                to={"/signup"}
                className='link'
              >
                <span>Click Here</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
