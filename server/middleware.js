const auth = require("./auth");

module.exports = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res.json({ error: "invalid token request" });
    return;
  }
  const verifiedJWT = auth.verifiedJWT(token);
  if (verifiedJWT.success) {
    req.username = verifiedJWT.username;
    next();
  } else {
    res.json({ error: "invalid token" });
  }
};
