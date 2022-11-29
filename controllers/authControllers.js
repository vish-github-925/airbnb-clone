const { clientDB } = require("../config/dbConn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const process_login = async (req, res) => {
  const { email, password } = req.body;
  // checking user existance in the db
  console.log(email, password);
  let user;

  user = await clientDB.db().collection("users").findOne({ email });
  // if user already exists and password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60000,
    });
    res.cookie("user", user.username);
    res.cookie("auth_token", jwtToken);
    if (req.baseUrl.includes("host")) {
      res.redirect("/host/homes");
    } else if (req.baseUrl.includes("rooms")) {
      res.redirect(`/rooms/${req.path.split("/")[1]}`);
    } else {
      res.redirect("/");
    }
  } else {
    res.cookie("error", "User doesnt exist", { maxAge: 10000 });
    if (req.baseUrl.includes("host")) {
      res.redirect("/host/homes");
    } else if (req.baseUrl.includes("rooms")) {
      res.redirect(`/rooms/${req.path.split("/")[1]}`);
    } else {
      res.redirect("/");
    }
  }
};

// signup
const process_signup = async (req, res) => {
  const { username, email, password, password2 } = req.body;

  if (password === password2) {
    // jwt token

    // check user existance
    let user;

    user = await clientDB.db().collection("users").findOne({ email });

    if (user) {
      res.cookie(
        "error",
        "User already exists, Please create an account first",
        { maxAge: 10000 }
      );
      if (req.baseUrl.includes("host")) {
        res.redirect("/host/homes");
      } else if (req.baseUrl.includes("rooms")) {
        res.redirect(`/rooms/${req.path.split("/")[1]}`);
      } else {
        res.redirect("/");
      }
      return;
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    newUser = await clientDB
      .db()
      .collection("users")
      .insertOne({ username, email, password: hashedPassword });

    res.cookie("user", username);

    const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 60000,
    });
    res.cookie("auth-token", jwtToken);
    if (req.baseUrl.includes("host")) {
      res.redirect("/host/homes");
    } else if (req.baseUrl.includes("rooms")) {
      res.redirect(`/rooms/${req.path.split("/")[1]}`);
    } else {
      res.redirect("/");
    }
  } else {
    res.cookie("error", "Passwords did not match, Please try again", {
      maxAge: 10000,
    });
    if (req.baseUrl.includes("host")) {
      res.redirect("/host/homes");
    } else if (req.baseUrl.includes("rooms")) {
      res.redirect(`/rooms/${req.path.split("/")[1]}`);
    } else {
      res.redirect("/");
    }
  }
};
// logout
const process_logout = async (req, res) => {
  res.clearCookie("auth_token");
  res.clearCookie("userType");
  res.clearCookie("user");
  res.clearCookie("host");
  if (req.baseUrl.includes("rooms")) {
    return res.redirect(`/rooms/${req.path.split("/")[1]}`);
  } else if (req.baseUrl.includes("host")) {
    return res.redirect(`/host/homes`);
  }
  res.redirect("/");
};
module.exports = {
  process_login,
  process_signup,
  process_logout,
};
