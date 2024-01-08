import React, { useState,useEffect } from "react";
//External packages here

import { Popover } from "antd";
import { notification } from "antd";
//Supporting utilities files here
import { validateNewpassword } from "../../utils/validate";
import { checkPasswordCriteria } from "../../components/PasswordRequirement";

//Images here
import Logo from "/images/dckap_palli_logo_lg.svg";
import ResetPasswordImage from "/images/change_password.svg";
import axios from "axios";
import { API_END_POINT } from "../../../config";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [verificationToken,setVerificationToken] = useState("")
  const [passwordError, setPasswordError] = useState({});
  const [passwordCriteria, setpasswordCriteria] = useState(null);
  const [popoverShow, setPopovershow] = useState(false);
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

   if(token){
    axios.get(`${API_END_POINT}/api/accounts/password/token_verification/?token=${token}`).then((res)=>{
      if(res.data.message){
        setVerificationToken(token);
      }
    }).catch((error)=>{
      if(error.response && error.response.data.status === 400){
        notification.error({
          message: "Error",
          description: `${error.response.data.errors}`,
        })
        navigate("/login")
      }
      
    })
   }
  }, [location.search]);



  const handleInputs = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
    if (passwordError[name]) delete passwordError[name];
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };
  const handleNewpassword = (e) => {
    handleInputs(e);
    const { value } = e.target;
    checkPasswordCriteria(value, setpasswordCriteria);
  };
  const handleFocus = () => {
    setPopovershow(true);
    checkPasswordCriteria(newPassword.newPassword, setpasswordCriteria);
  };
  const handleResetPassword = (e) => {
    e.preventDefault();
    let validateField = validateNewpassword(newPassword, setPasswordError);
    if (validateField) {

      const headers = {
        "Content-type": "application/json",
      };
      if(verificationToken){
        axios.post(`${API_END_POINT}/api/accounts/change/password?token=${verificationToken}`,{password:newPassword.confirmPassword},{headers}).then((res)=>{
          notification.success({
            message : "Success",
            description : `${res.data.message}`,
            duration:2
          });
          navigate("/login")
        }).catch((error)=>{
          if (error.response && error.response.status === 400) {
            notification.error({
              message: "Link Used",
              description: `The link has expired Please request a new one`,
              duration: 2,
            });
          
          } 
        })
      }
    }
  };

  return (
    <div className="reset-password-wrapper">
      <div className="reset-container">
        <div className="left-side-container">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="heding">
            <div className="headings">
              <h3>
                Change Your <br /> Password.?
              </h3>
              <p>
                Your password must be at least 8 characters long <br /> Avoid
                common words or patterns.
              </p>
            </div>
            <div className="input-container">
              <div className="rest-password-input">
                <label htmlFor="Password">
                  New Password
                  <span className="required-symbole">*</span>
                </label>
                <div className="input--eye--icon">
                  <Popover
                    content={passwordCriteria}
                    trigger={"focus"}
                    placement="right"
                    open={popoverShow}
                  >
                    <input
                      type={showPassword.newPassword ? "text" : "password"}
                      id="Password"
                      name="newPassword"
                      placeholder="Input password"
                      className="input-field"
                      value={newPassword.newPassword}
                      onChange={handleNewpassword}
                      onBlur={() => setPopovershow(false)}
                      onFocus={handleFocus}
                    />
                  </Popover>
                  <span
                    id="eye--off"
                    className="material-symbols-outlined"
                    onClick={() => togglePasswordVisibility("newPassword")}
                  >
                    {showPassword.newPassword ? "visibility" : "visibility_off"}
                  </span>
                </div>
                <p className="error-message">
                  {passwordError.newPassword ? passwordError.newPassword : ""}
                </p>
                <div className="input--eye--icon">
                  <label htmlFor="Password">
                    Confirm New Password
                    <span className="required-symbole">*</span>
                  </label>
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    id="ConfirmPassword"
                    name="confirmPassword"
                    className="input-field"
                    placeholder="Input password"
                    value={newPassword.confirmPassword}
                    onChange={handleInputs}
                  />
                  <span
                    id="eye--on"
                    name="confirmPassword"
                    className="material-symbols-outlined"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    {showPassword.confirmPassword
                      ? "visibility"
                      : "visibility_off"}
                  </span>
                </div>
              </div>
              <div className="reset-password">
                <p className="error-message">
                  {passwordError.confirmPassword
                    ? passwordError.confirmPassword
                    : ""}
                </p>

                <button type="submit" onClick={handleResetPassword}>
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="resetImage">
            <img src={ResetPasswordImage} alt="ResetPasswordImage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
