import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { useGlobalContext } from "../../Context/globalContext";
import { Link, useNavigate } from "react-router-dom";
import { invalid } from "../../utils/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const { BASE_URL, token } = useGlobalContext();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const location = useLocation();
  const [isValid, setIsValid] = useState(true);
  const [urlToken, setUrlToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    } else {
      const searchParams = new URLSearchParams(location.search);
      setUrlToken(searchParams.get("t"));

      axios
        .get(`${BASE_URL}/auth/verify-token`, {
          headers: { Authorization: urlToken },
        })
        .then((res) => {
          setIsLoading(false);
          setIsValid(true);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsValid(false);
        });
    }
  }, [urlToken]);

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
            Authorization: urlToken,
          },
        }
      )
      .then((res) => {
        toast.success("Password Changed Successfully");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      {!isLoading && (
        <div>
          {isValid ? (
            <div className="resetpassword">
              <div className="resetpassword-container">
                <h1>Create a new password</h1>
                <div className="resetpassword-fields">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <button onClick={handleSubmit}>Change Password</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="valid-link">
              <div className="resetpassword-container">
                <h1>{invalid} This link is not valid.</h1>
                <div className="invalid"></div>

                <p className="resetpassword-resend">
                  Resend Link?{" "}
                  <Link to={"/forget-password"} className="link">
                    <span>Click Here</span>
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ResetPassword;
