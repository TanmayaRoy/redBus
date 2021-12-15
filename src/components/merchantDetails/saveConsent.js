import fixed from "../../common/constants";
import {generateEncryptedKeyData, generateEncryptedHeader} from "../../encryption/encryption";
import axios from "axios";

const [constant] = fixed;
const url = BASE_URL;
const saveConsent = (consentFlag) => {
  const consentBody = {
    consent: consentFlag,
    consentType: constant.CONSENT_TYPE,
    consentPurpose: constant.CONSENT_PURPOSE,
    consentMode: constant.CONSENT_MODE,
    consentDescription: constant.CONSENT_DESCRIPTION,
    validTill: "",
  };
    var RequestHeaders = {
        "Content-Type": "application/json",
        channel: navigator.userAgent.match(/iPhone|iPad|iPod/i) ? 'IOS' : 'ANDROID',
        contentId: Math.random().toString(36).substr(2, 6),
        Authorization: generateEncryptedHeader(localStorage.getItem('deviceId'))
      };
    var requestBody = generateEncryptedKeyData(JSON.stringify(consentBody));

  axios.post(`${url}consent/saveConsent`, requestBody, { headers: RequestHeaders})
        .then((response) => {
            window.location.href = response.data.data.pwaLink;
            //alert('Consent has been saved successfully!')
            return response;
          });

};

export default saveConsent;
