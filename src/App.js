import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "./components/heading/heading";
import fixed from "./common/constants";
import MerchantDetails from "./components/merchantDetails/merchantDetails";
import spinnerImage from "./images/spinner.gif";
import {generateEncryptedHeader}  from './encryption/encryption';


const [constant] = fixed;
const App = () => {
  const [detail, setDetail] = useState([]);
  const [deviceError, setDeviceError] = useState(false);
  const url = BASE_URL;
  useEffect(() => {
      customerAppInIt();
  }, []);

  const customerAppInIt = function () {
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        iosInit();
    } else {
        androidInit();
    }
      //development();
  }
  const development = function () {
    if (!window['MyAirtelAppReact'] && !window['webkit']) {
        localStorage.setItem('deviceId', 'b26ae302-2419-420f-ade7-29a2dac73022');
        getConsentCall();
    }
  }

  const androidInit = function () {
    const custAppObject = window['MyAirtelAppReact'];
    if (custAppObject) {
        localStorage.setItem('deviceId', custAppObject.getWalletDeviceId());
        getConsentCall();
    } else {
        callSessionExpire();
    }
  }

  const iosInit = function () {
    window['iosParameters'] = handleIOSCallback;
    window['webkit'].messageHandlers.getParameters.postMessage('');
  }

  const handleIOSCallback = function (e) {
    const deviceInfo = JSON.parse(e);
    window.getParameters = deviceInfo;
    if (deviceInfo.deviceId) {
        localStorage.setItem('deviceId', deviceInfo.deviceId);
        getConsentCall();
    } else {
        callSessionExpire();
    }
  }

  const callSessionExpire = function () {
    setDeviceError(true);
    alert(constant.NO_DEVICE_ERROR);
  }
  
  const getConsentCall = function () {
     axios
      .get(`${url}consent/customerId`, {
        headers: {
          channel: navigator.userAgent.match(/iPhone|iPad|iPod/i) ? 'IOS' : 'ANDROID',
          contentId: Math.random().toString(36).substr(2, 6),
          Authorization: generateEncryptedHeader(localStorage.getItem('deviceId'))
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        data?.meta?.status == 0 && data?.data && data.data.consent == true ? window.location.href = data.data.pwaLink : setDetail(data);
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="consent-content">
      {deviceError?[<Heading />]:(!detail?.meta?.status && detail?.meta?.status !== 0 ? (
        <img className="spinner_image" src={spinnerImage} alt="spinner" />
      ): (
        [<Heading />, <MerchantDetails />]
      ))}
    </div>
  );
};

export default App;
