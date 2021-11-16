export function deobfuscate(encryptedText, secretKey, CryptoJS) {
  if (!encryptedText) return;
  if (secretKey.length < 24) {
    secretKey = secretKey.concat(secretKey.substr(0, 24 - secretKey.length));
  }
  var key = CryptoJS.enc.Utf8.parse(secretKey);
  var iv = CryptoJS.enc.Base64.parse('QUJDREVGR0g=');
  var bytes = CryptoJS.TripleDES.decrypt(encryptedText, key, {
    mode: CryptoJS.mode.CBC,
    iv: iv,
  });
  var decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}

export const fetchData = async (url, options) => {
  const resp = await (url, options);

  try {
    const data = await resp.json();

    const decryptedData = deobfuscate(data.NewsAlertEncModel, secretKey, cjs);
    const finalData = JSON.parse(decryptedData);

    return finalData;
  } catch (error) {
    console.log(error);
  }
};
