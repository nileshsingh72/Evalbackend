const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  var token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.TOP, function (err, decoded) {
      if (decoded) {
        req.body.userID = decoded.userID;
        next();
      } else {
        res.send({ msg: "Not authorized" });
      }
    });
  } else {
    res.send({ msg: "Not authorized" });
  }
};

module.exports = { authenticate };
