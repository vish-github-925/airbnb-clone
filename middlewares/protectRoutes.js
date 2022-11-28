const jwt = require("jsonwebtoken");
const { clientDB } = require("../config/dbConn");

const protectRoutes = async (req, res, next) => {
  const jwtToken = req.cookies.auth_token;
  const { id } = jwt.verify(jwtToken, process.env.JWT_SECRET);
  console.log(id);
  const user = clientDB.db().collection("users").findOne({ _id: id });
  //   check user exists
  if (user) {
    req.user = user;
    next();
  } else {
    console.log("error");
  }
};
module.exports = { protectRoutes };
