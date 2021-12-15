import React, { useState } from "react";
import merchantDescription from "../../../common/merchantDescription";
import saveConsent from "../saveConsent";
import lockImage from "../../../images/lock.png";

const [merchant] = merchantDescription;
const Consent = (props) => {
  const [disable, setDisable] = useState(false);
  const handleClickAllow = () => {
    setDisable(true);
    saveConsent(true);
  };
  const handleClickDeny = () => {
    setDisable(true);
    saveConsent(false);
  };
  return (
    <div className="wrapper">
      <div className="wrapper_content">
        <div className="wrapper_content_banner">{props.bannerImg}</div>
        {props.errorText ?
          (<div className="wrapper_content_error-text">{props.errorText}</div>) : false
        }

        <div className="wrapper_content_login-text">
          <h1 className="wrapper_content_login-text--heading">
            {merchant.loginText}
          </h1>
          <p className="wrapper_content_login-text--sub-heading">
            {props.merchantName} {merchant.merchantText}
          </p>
        </div>
        <div className="wrapper_content_text">
          <div className="wrapper_content_text-img">
            <img src={lockImage} alt="Lock" />
          </div>
          <div className="wrapper_content_text-sub">{merchant.secureText}</div>
        </div>
      </div>
      <div className="wrapper_btn">
        <button
          className="wrapper_btn--blue"
          disabled={disable}
          onClick={handleClickAllow}
        >
          Allow
        </button>
        <button
          className="wrapper_btn--white"
          disabled={disable}
          onClick={handleClickDeny}
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default Consent;
