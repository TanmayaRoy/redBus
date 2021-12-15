import React, { useState, useEffect } from "react";
import axios from "axios";
import Consent from "./merchantConsent/consent";
import fixed from "../../common/constants";
import loaderImage from "../../images/loader.gif";

const [constant] = fixed;
const MerchantDetails = () => {
  const [errorText, setErrorText] = useState(false);
  const [details, setDetails] = useState(false);
  const url = BASE_URL;
  useEffect(() => {
    axios
      .get(`${url}merchantDetails/redbus`)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setDetails(data.data);
      })
      .catch((err) => err.message == setErrorText(constant.ERROR_MSG));
  }, []);

  return (
    <div>
      <Consent
        merchantName={details.name}
        bannerImg={
          details.bannerlogo ? (
            <img
              className="wrapper_content_banner_image"
              src={details.bannerlogo}
              alt="Banner"
            />
          ) : (
            <img className="loader_image" src={loaderImage} alt="loader" />
          )
        }
        errorText={errorText}
        setUrl={details.pwaLink}
      />
    </div>
  );
};

export default MerchantDetails;
