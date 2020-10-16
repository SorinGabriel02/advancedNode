// use buffer
const Buffer = require("safe-buffer").Buffer;
// use keygrip and secret cookie key to create a valid signature
// --> simulate what cookie-session does
const KeyGrip = require("keygrip");
const keys = require("../../config/keys");
const keyGrip = new KeyGrip([keys.cookieKey]);

module.exports = (user) => {
  // create a session object that matches what is inside browser cookie
  const sessionObj = {
    passport: {
      user: user._id.toString(),
    },
  };
  // revert sessionObj by creating a buffer and
  // turning that buffer into a base64 string
  // should be identical with the cookie sent to the browser
  const session = Buffer.from(JSON.stringify(sessionObj)).toString("base64");
  const sig = keyGrip.sign("express:sess=" + session);

  return { session, sig };
};
