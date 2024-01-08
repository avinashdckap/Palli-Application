import React from "react";

import "./scss/PasswordRequirement.css";

const PasswordRequirements = ({ criteria }) => {
  const renderCriteria = (check, text) => (
    <li className="criteria">
      {check ? (
        <span>
          <img className="close-btn" src="/icons/tick.svg" alt="cancel" />
        </span>
      ) : (
        <span>
          <img className="close-btn" src="/icons/remove.svg" alt="cancel" />
        </span>
      )}{" "}
      {text}
    </li>
  );

  return (
    <ul>
      {renderCriteria(criteria.lengthCheck, "Minimum 8 characters")}
      {renderCriteria(criteria.upperCaseCheck, "At least one uppercase letter")}
      {renderCriteria(criteria.lowerCaseCheck, "At least one lowercase letter")}
      {renderCriteria(criteria.numberCheck, "At least one digit")}
      {renderCriteria(criteria.specialCharCheck,"At least one special character")}
    </ul>
  );
};

export const getPasswordError = (criteria) => {
  let error = "";
  switch (true) {
    case !criteria.lengthCheck:
      error = "Minimum 8 characters";
      break;
    case !criteria.upperCaseCheck:
      error = "At least one uppercase letter";
      break;
    case !criteria.lowerCaseCheck:
      error = "At least one lowercase letter";
      break;
    case !criteria.numberCheck:
      error = "At least one digit";
      break;
    case !criteria.specialCharCheck:
      error = "At least one special character";
      break;
    default:
      break;
  }
  return error;
};

export const checkPasswordCriteria = (password, setPasswordCriteria) => {
  let criteria = passwordRequirements(password);
  const error = getPasswordError(criteria);

  const content = <PasswordRequirements criteria={criteria} />;
  setPasswordCriteria(content);
};

export const passwordRequirements = (password) => {
  const lengthCheck = /.{8,}/.test(password);
  const upperCaseCheck = /[A-Z]/.test(password);
  const lowerCaseCheck = /[a-z]/.test(password);
  const numberCheck = /\d/.test(password);
  const specialCharCheck = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  return {
    lengthCheck,
    upperCaseCheck,
    lowerCaseCheck,
    numberCheck,
    specialCharCheck,
  };
};
