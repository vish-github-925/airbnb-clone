const jwt = require("jsonwebtoken");
const { clientDB } = require("../config/dbConn");

const protectRoutes = async (req, res, next) => {
  if (!req.cookies.auth_token) {
    if (req.baseUrl.includes("host")) {
      return res.redirect("/host/homes");
    } else {
      return res.redirect("/");
    }
  }
  const jwtToken = req.cookies.auth_token;
  const { id } = jwt.verify(jwtToken, process.env.JWT_SECRET);
  console.log(id);
  const user = clientDB.db().collection("users").findOne({ _id: id });
  //   check user exists
  if (user) {
    req.user = user;
    next();
  } else {
    if (req.baseUrl.includes("host")) {
      res.redirect("/host/homes");
    } else {
      res.redirect("/");
    }
  }
};
module.exports = { protectRoutes };
