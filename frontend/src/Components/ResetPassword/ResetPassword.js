import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { useGlobalContext } from "../../Context/globalContext";
import { Link, useNavigate } from "react-router-dom";
import { invalid } from "../../utils/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const { BASE_URL } = useGlobalContext();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const location = useLocation();
  const [isValid, setIsValid] = useState(true);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setToken(searchParams.get("t"));
    console.log(token);

    axios
      .get(`${BASE_URL}/auth/verify-token`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setIsValid(true);
      })
      .catch((error) => {
        setIsValid(false);
      });
  }, [token]);

  const handleSubmit = () => {
    axios
      .post(
        `${BASE_URL}/auth/reset-password`,
        {
          password,
          confirmPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        toast.success("Password Changed Successfully");
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Error");
      });
  };

  return (
    <>
      <div>
        {isValid ? (
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
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
}

export default ResetPassword;
