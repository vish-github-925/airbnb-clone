// requiring the db connection Object
const { clientDB } = require("../config/dbConn");

// requiring the bcrypt and jwt modules required for password hashing and JWT token generation
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// controller function to process user login
const process_login = async (req, res) => {
  const { email, password } = req.body;
  // checking user existance in the db
  let user;

  // db query to check if the user is existed in the "users" collection
  user = await clientDB.db().collection("users").findOne({ email });

  // if user exists and password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    // creating the JWT token
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60000,
    });

    // creaing the cookies
    res.cookie("user", user.username);
    res.cookie("auth_token", jwtToken);

    // based on the baseUrl redirecting to the required urls
    if (req.baseUrl.includes("host")) {
      res.redirect("/host/homes");
    } else if (req.baseUrl.includes("rooms")) {
      res.redirect(`/rooms/${req.path.split("/")[1]}`);
    } else {
      res.redirect("/");
    }
  } else {
    // if user doesn't exist in the db, creating error cookie and redirecting to the required urls
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

// controller function to process user signup
const process_signup = async (req, res) => {
  const { username, email, password, password2 } = req.body;

  // check if the password and confirm password matches
  if (password === password2) {
    let user;
    // db query to check if user is already existed in the db
    user = await clientDB.db().collection("users").findOne({ email });

    // if user already existed, redirecting with a error cookie to the required urls
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

    // if user doesn't exist in the db, hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    // inserting the newuser in the db
    newUser = await clientDB
      .db()
      .collection("users")
      .insertOne({ username, email, password: hashedPassword });

    res.cookie("user", username);

    // creating the JWT token
    const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 60000,
    });
    res.cookie("auth-token", jwtToken);

    // redirecting to the urls based on the baseUrl request
    if (req.baseUrl.includes("host")) {
      res.redirect("/host/homes");
    } else if (req.baseUrl.includes("rooms")) {
      res.redirect(`/rooms/${req.path.split("/")[1]}`);
    } else {
      res.redirect("/");
    }
  } else {
    // if passwords doesnt match, redirecting with an error message
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
// controller function to process the user logout
const process_logout = async (req, res) => {
  res.clearCookie("auth_token");
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
