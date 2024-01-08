import React, { useState } from "react";

import axios from "axios";
import { notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";


import { isEmailValid } from "../../utils/validate";

import { API_END_POINT } from "../../../config";

import { useAuth } from "../../context/AuthContext";

import "../forgotPage/scss/ForgotPage.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleEmail = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    if (emailError[name]) delete emailError[name];
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    const isvalidEmail = isEmailValid(email);
    if (isvalidEmail) {
      setEmailError({ ...emailError, email: isvalidEmail });
    } else {
      //doing api call
      setLoading(true)
      axios.post(`${API_END_POINT}/api/accounts/forgot_password/`,{email}).then((res)=>{
        notification.success({
          message: "Success",
          description: `${res.data.message}`,
          duration: 2,
        });
        setEmail("")
      }).catch((error)=>{
        if (error.response && error.response.status === 400) {
            notification.error({
              message: "InvalidUser",
              description: `Email Not Found`,
              duration: 2,
            });
          // Handle the error or take necessary actions
        } 
      }).finally(()=>{
        setLoading(false);
        
      })
    }
  };
  return (
    <div className="container">
      <main className="forgot-page-container">
        <div className="logo-container">
        <a className="back" href="/">
          <img
            className="logo"
            src="/images/dckap_palli_logo_sm.svg"
            alt=""
            draggable={false}
          />
          </a>
        </div>
        <div className="forgot-container flex">
          <div className="login-image-container">
            <img src={"/images/forgot_password1.svg"} alt="ForgotPasswordImage" />
          </div>
          <div className="">
            <div className="forgot-form-container">
             
                <a className="back" href="/">
                  <span>
                    <img src="/icons/backIcon.svg" alt="" />
                  </span>
                  <p className="backtologin">Back to login</p>
                </a>
             
              <div className="form-heading">
                <h1>Forgot Password?</h1>
                <p>No Worries we’ll send you reset instructions</p>
              </div>

              <div className="form-container">
                <form action="" onSubmit={handelSubmit}>
                  <div className="email-container flex">
                    <label htmlFor="Email">
                      Email Id
                      <span className="required-symbole">*</span>
                    </label>
                    <div className="">
                      <input
                        autoComplete="off"
                        type="text"
                        className={`email-input ${emailError.email ? "error-notify":""}`}
                        placeholder="Type here..."
                        value={email}
                        onChange={handleEmail}
                        name="email"
                      />
                    </div>

                    <p className="error-message">
                      {emailError.email ? emailError.email : ""}
                    </p>
                  </div>

                  {/* Reset password button */}
                  <div className="forgot-button-container">
                    {/* <button className="btn primary-medium ">
                      Send reset link
                    </button> */}

                    <button className="btn primary-medium " disabled={loading}>
                    {loading ? (
                      <span>
                        Sending...
                        <LoadingOutlined className="loader" />
                      </span>
                    ) : (
                      "Send reset link"
                    )}
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

 
      </main>
    </div>
  );
};

export default ForgotPassword;
