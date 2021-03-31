/*
 * @Descripttion: [加密解密]
 * @version: 1.0.0
 * @Author: Swoter
 * @Date: 2020-04-13 12:58:46
 * @LastEditors: Swoter
 * @LastEditTime: 2020-09-25 23:56:09
 */

const Base64 = require("js-base64").Base64;
const md5 = require("md5");
export default {
  cryptEncode(message, password) {
    // initialize the crypted message var
    let crypted = "";
    // crypt each letter
    let indexLetterInText, indexLetterInPass, cryptedLetter;
    for (let i = 0; i < message.length; i++) {
      indexLetterInText = message[i].charCodeAt(0);
      indexLetterInPass = password[i % password.length].charCodeAt(0);
      cryptedLetter = String.fromCharCode(
        indexLetterInText + indexLetterInPass
      );
      crypted = crypted.concat(cryptedLetter);
    }
    // return
    return Base64.encode(crypted);
  },

  cryptDecode(cryptedMessage, password) {
    cryptedMessage = Base64.decode(cryptedMessage);
    // initialize the decrypted message var
    let decrypted = "";
    // decrypt each letter
    let indexLetterInText, indexLetterInPass, decryptedLetter;
    for (let i = 0; i < cryptedMessage.length; i++) {
      indexLetterInText = cryptedMessage[i].charCodeAt(0);
      indexLetterInPass = password[i % password.length].charCodeAt(0);
      decryptedLetter = String.fromCharCode(
        indexLetterInText - indexLetterInPass
      );
      decrypted = decrypted.concat(decryptedLetter);
    }
    // return
    return decrypted;
  },
  md5(str) {
    return md5(str);
  },
};
