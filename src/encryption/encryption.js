import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";

var ENC_PUBLIC_KEY = `3082 0122 300d 0609 2a86 4886 f70d 0101 0105 0003 8201 0f00 3082 010a 0282 0101 009e c52b 21ed
6908 92e8 8205 695f 0777 1967 a85f e15c eae0 1852 43eb 82b7 b089 787c f7de 6e4c f54a cdf2 40cb 98a8 a859
8e7e 95ca 22e6 8519 de30 4bf0 6b68 b947 c6d3 3efe abc0 92b7 832a 62da 058a a7d2 9dc4 684c 0a50 83d7 c782
c04c 0f54 8a9d d664 c999 d3c4 e81f 0258 f290 a40e a58b c872 6de3 97fa 8f65 8b3f 0a26 e397 be6c eed4 bd4b
f596 14b1 5823 6e0f c29b c0fa e1c0 a50e 898e 4f2f e3d2 3204 b232 74d5 38c4 0808 5e57 f094 9117 34dd c1b3
65b3 f2c5 ac3a 813b 18e3 dba4 2f2f 6a28 f486 16b0 296b 7eea 482c 5979 33a7 b1c5 8d90 013a 85f0 49ff 2e70
f87a 2a30 d48e 16b7 cb1c 626b e995 2db6 5296 f06a bb5f ffd3 01d2 0b9f 5eb8 80da f125 f906 81fa 3e3a 3902
0301 0001`;
var ENC_CHAR_CONST = {
  ibm: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  airtel: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
};
export function tripleDesEncryption(data, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.TripleDES.encrypt(data, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

export function generateEncryptedHeader(dataParams) {
  const RSAObject = new JSEncrypt();
  RSAObject.setKey(ENC_PUBLIC_KEY);
  return RSAObject.encrypt(dataParams);
}

export function generateEncryptedKeyData(dataParams) {
  const RSAObject = new JSEncrypt();
  RSAObject.setKey(ENC_PUBLIC_KEY);

  const randomKey = generateRandomString(24, "ibm");
  const encryptData = {
    key: RSAObject.encrypt(randomKey),
    data: tripleDesEncryption(dataParams, randomKey),
  };
  return (
    "data=" +
    encodeURIComponent(encryptData.data) +
    "&key=" +
    encodeURIComponent(encryptData.key)
  );
}

export function generateRandomString(length, type) {
  let count = length;
  let str = "";
  let rnd = 0;
  while (count > 0) {
    if (
      (count === 11 || count === 24) &&
      (length === count || (length === 24 ? count !== 11 : true))
    ) {
      str = "";
    }
    rnd = Math.floor(Math.random() * ENC_CHAR_CONST[type].length);
    str += ENC_CHAR_CONST[type].charAt(rnd);
    count--;
  }
  return str;
}
