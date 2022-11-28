const { clientDB } = require("../config/dbConn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const process_login = async (req, res) => {
  const { username, password } = req.body;
  // checking user existance in the db
  console.log(req.baseUrl);
  let user;
  if (req.baseUrl.includes("host")) {
    user = await clientDB.db().collection("hosts").findOne({ username });
  } else {
    user = await clientDB.db().collection("users").findOne({ username });
  }
  // if user already exists and password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60000,
    });
    if (req.baseUrl.includes("host")) {
      res.cookie("userType", "host");
      res.cookie("host", user.username);
    } else {
      res.cookie("userType", "user");
      res.cookie("user", user.username);
    }
    res.cookie("auth_token", jwtToken);
    res.clearCookie("error");
    if (req.baseUrl.includes("host")) {
      res.redirect("/host/homes");
    } else {
      res.redirect("/");
    }
  } else {
    res.cookie("error", "user doesnt exist");
    res.redirect("/");
  }
};

// signup
const process_signup = async (req, res) => {
  const { username, password, password2 } = req.body;

  if (password === password2) {
    // jwt token

    // check user existance
    let user;
    if (req.baseUrl.includes("host")) {
      user = await clientDB.db().collection("hosts").findOne({ username });
    } else {
      user = await clientDB.db().collection("users").findOne({ username });
    }
    if (user) {
      res.cookie("error", "User already exists");
      return res.redirect("/");
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;
    if (req.baseUrl.includes("host")) {
      newUser = await clientDB
        .db()
        .collection("hosts")
        .insertOne({ username, password: hashedPassword });
      res.cookie("host", username);
      res.cookie("userType", "host");
    } else {
      newUser = await clientDB
        .db()
        .collection("users")
        .insertOne({ username, password: hashedPassword });
      res.cookie("user", username);
      res.cookie("userType", "user");
    }
    const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 60000,
    });
    res.cookie("auth-token", jwtToken);
    res.clearCookie("error");
    if (req.baseUrl.includes("host")) {
      res.redirect("/host/homes");
    } else {
      res.redirect("/");
    }
  } else {
    res.cookie("error", "Passwords did not match, Please try again");
    res.redirect("/");
  }
};
// logout
const process_logout = async (req, res) => {
  res.clearCookie("auth_token");
  res.clearCookie("userType");
  res.clearCookie("user");
  res.clearCookie("host");
  res.redirect("/");
};
module.exports = {
  process_login,
  process_signup,
  process_logout,
};
