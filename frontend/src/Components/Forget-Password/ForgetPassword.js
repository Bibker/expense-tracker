import React, { useState } from "react";
import { useGlobalContext } from "../../Context/globalContext";
import "./forget-password.css";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { BASE_URL } = useGlobalContext();
  const [email, setEmail] = useState();
  const [mailSent, setMailSent] = useState(false);
  const [isLoading, setIsLoading] = useState("");

  const handleSubmit = () => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth/forgot-password`, {
        email,
      })
      .then((res) => {
        setIsLoading(false);
        setMailSent(res.data.message);
        toast.success("Mail Sent Successfully");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Email is not registered");
      });
  };

  return (
    <>
      <div>
        <div className="forgetpassword">
          <div className="forgetpassword-container">
            {!mailSent ? (
              <>
                <h1>Enter your email</h1>
                <div className="forgetpassword-fields">
                  <input
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <button onClick={handleSubmit}>Send Reset Link</button>
                </div>
              </>
            ) : (
              <div className="mail-sent">
                <img
                  src="tick.png"
                  style={{ height: "10vh", width: "10vh", alignSelf: "center" }}
                />
                <div>{mailSent}</div>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Back to login
                </button>
              </div>
            )}
            <div className="animation">
              {isLoading && (
                <RotatingLines
                  Loading={true}
                  height="90"
                  width="90"
                  strokeColor="red"
                  strokeWidth="3"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
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
