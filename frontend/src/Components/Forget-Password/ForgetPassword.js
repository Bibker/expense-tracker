import React, { useState } from "react";
import { useGlobalContext } from "../../Context/globalContext";
import "./forget-password.css";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const ForgetPassword = () => {
  const { BASE_URL } = useGlobalContext();
  const [email, setEmail] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = () => {
    setIsVisible(true);

    axios
      .post(`${BASE_URL}/auth/forgot-password`, {
        email,
      })
      .then((res) => {
        setIsVisible(false);

        toast.success(res.data.message);
        // navigate("/reset-password");
      })
      .catch((err) => {
        setIsVisible(false);

        toast.error("Email is not registered");
      });
  };

  return (
    <>
      <div>
        <div className='forgetpassword'>
          <div className='forgetpassword-container'>
            <h1>Reset Password</h1>
            <div className='forgetpassword-fields'>
              <input
                type='email'
                placeholder='Email Address'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <button onClick={handleSubmit}>Send Password Reset Link</button>
            <div className='animation'>
              {isVisible && (
                <RotatingLines
                  visible={true}
                  height='96'
                  width='96'
                  color='grey'
                  strokeWidth='5'
                  animationDuration='0.75'
                  ariaLabel='rotating-lines-loading'
                  wrapperStyle={{}}
                  wrapperClass=''
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
