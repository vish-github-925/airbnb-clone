require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const { clientDB } = require("./config/dbConn");

// requiring defined modules(files)
const authRoutes = require("./routes/authRoutes");
const rootRoutes = require("./routes/rootRoutes");
const hostRoutes = require("./routes/hostRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookRoutes = require("./routes/bookRoutes");

// Initialising app
const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "xyz123abcd098",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
    },
  })
);

// Setting view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// Settign public folder as express static folder
app.use(express.static(path.resolve(__dirname, "public")));

// Routes
app.use("/", rootRoutes);
// user auth routes
app.use("/auth", authRoutes);
// host auth routes
app.use("/host/auth", authRoutes);
// host routes
app.use("/host", hostRoutes);
// room routes
app.use("/rooms", roomRoutes);
// book routes
app.use("/book", bookRoutes);
// logout
app.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.clearCookie("host");
  res.redirect("/");
});

// PORT
const PORT = process.env.PORT || 5000;

// Server listening on PORT

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});