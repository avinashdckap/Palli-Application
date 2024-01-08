import React, { useState } from "react";
//External packages here
import { Popover } from "antd";
//Supporting utilities files here
import { validateNewpassword } from "../../utils/validate";

import { checkPasswordCriteria } from "../../components/PasswordRequirement/PasswordRequirement";

//CSS here
import "./scss/ChangePasswordPage.css";
const ResetPasswordPage = () => {
  const [passwordError, setPasswordError] = useState({});
  const [passwordCriteria, setpasswordCriteria] = useState(null);
  const [popoverShow, setPopovershow] = useState(false);

  // State for newPassword and confirmPassword separately
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    if (passwordError[name]) delete passwordError[name];
  };

  const handleNewPassword = (e) => {
    handleInputs(e);
    const { value } = e.target;
    checkPasswordCriteria(value, setpasswordCriteria);
  };
  const handleFocus = () => {
    setPopovershow(true);
    checkPasswordCriteria(newPassword, setpasswordCriteria);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validateField = validateNewpassword(
      { newPassword, confirmPassword },
      setPasswordError
    );
    if (validateField) {
      // make api call or perform necessary actions
    }
  };

  const handleEyeIconLongPress = (field) => {
    setShowNewPassword((prevState) => ({ ...prevState, [field]: true }));
  };

  const handleEyeIconEndPress = (field) => {
    setShowNewPassword((prevState) => ({ ...prevState, [field]: false }));
  };
  return (
    <div className="reset-password-container">
      <div className="reset-container">
        <a href="/">
          <div className="logo">
            <img src="/images/dckap_palli_logo_sm.svg" alt="Logo" />
          </div>
        </a>
        <div className="content-wrapper flex">
          <div className="input-container">
            <div className="headings">
              <a className="back" href="/">
                <span>
                  <img src="/icons/backIcon.svg" alt="" />
                </span>
                <span className="backtologin">Back to login</span>
              </a>
              <h3>
                Change Your <br /> Password.?
              </h3>
              <p>
                Your password must be at least 8 characters long. Avoid common
                words or patterns.
              </p>
            </div>
            <div className="inputs">
              <div className="rest-password-input">
                <div className="input-eye-icon">
                  <label htmlFor="Password" className="password">
                    New Password
                    <span className="required-symbole">*</span>
                  </label>
                  <Popover
                    className="popover"
                    content={passwordCriteria}
                    trigger={"focus"}
                    placement="right"
                    open={popoverShow}
                  >
                    <input
                      type={showNewPassword.newPassword ? "text" : "password"}
                      id="Password"
                      name="newPassword"
                      placeholder="Input Password"
                      className={`input-field ${
                        passwordError.newPassword ? "error-notify " : ""
                      }`}
                      value={newPassword.newPassword}
                      onChange={handleNewPassword}
                      onFocus={handleFocus}
                      onBlur={() => setPopovershow(false)}
                    />
                  </Popover>
                  <span
                    id="eye--off"
                    className="material-symbols-outlined eye-icon"
                    onTouchStart={() => handleEyeIconLongPress("newPassword")}
                    onTouchEnd={() => handleEyeIconEndPress("newPassword")}
                    onMouseDown={() => handleEyeIconLongPress("newPassword")}
                    onMouseUp={() => handleEyeIconEndPress("newPassword")}
                    onMouseLeave={() => handleEyeIconEndPress("newPassword")}
                  >
                    {showNewPassword.newPassword
                      ? "visibility"
                      : "visibility_off"}
                  </span>
                  <p className="error-message">
                    {passwordError.newPassword ? passwordError.newPassword : ""}
                  </p>
                </div>

                <div className="input-eye-icon">
                  <label htmlFor="Password" className="password confirm">
                    Confirm New Password
                    <span className="required-symbole">*</span>
                  </label>
                  <input
                    type={showNewPassword.confirmPassword ? "text" : "password"}
                    id="ConfirmPassword"
                    name="confirmPassword"
                    className={`input-field ${
                      passwordError.confirmPassword ? "error-notify " : ""
                    }`}
                    placeholder="Input Password"
                    value={newPassword.confirmPassword}
                    onChange={handleInputs}
                  />
                  <span
                    id="eye--on"
                    name="confirmPassword"
                    className="material-symbols-outlined eye-icon"
                    onTouchStart={() =>
                      handleEyeIconLongPress("confirmPassword")
                    }
                    onTouchEnd={() => handleEyeIconEndPress("confirmPassword")}
                    onMouseDown={() =>
                      handleEyeIconLongPress("confirmPassword")
                    }
                    onMouseUp={() => handleEyeIconEndPress("confirmPassword")}
                    onMouseLeave={() =>
                      handleEyeIconEndPress("confirmPassword")
                    }
                  >
                    {showNewPassword.confirmPassword
                      ? "visibility"
                      : "visibility_off"}
                  </span>
                  <p className="error-message">
                    {passwordError.confirmPassword
                      ? passwordError.confirmPassword
                      : ""}
                  </p>
                </div>
              </div>
              <div className="reset-password">
                <button
                  type="submit"
                  className="reset-sbmt-btn"
                  onClick={handleSubmit}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
          <div className="resetImage">
            <img src="/images/change_password1.svg" alt="ResetPasswordImage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
