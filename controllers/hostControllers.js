// requiring the db connection Object
const { clientDB } = require("../config/dbConn");

// controller funciton to get the HostPage view
const get_hosthome = (req, res) => {
  // rendering the "HostPage" view with necessary data
  res.render("HostPage", {
    data: {
      username: req.cookies.user,
      error: req.cookies.error,
    },
  });
};

// controller function to get the SetupHomePage vie
const get_setuphome = (req, res) => {
  // rendering the "SetupHomePage" view with necessary data
  res.render("SetupHomePage", {
    data: {
      username: req.cookies.user,
      error: req.cookies.error,
    },
  });
};

// controller function to add the home created by the user to the db
const add_newhome = async (req, res) => {
  // storing the req.body data by creating the required object
  const roomData = {
    name: req.body.name,
    address: {
      street: req.body.street,
    },
    images: {
      picture_url: req.body.picture_url,
    },
    host: {
      is_superhost: req.body.superhost,
      host_name: req.body.hostname,
      host_about: req.body.hostabout,
      host_response_rate: req.body.responseRate,
      host_response_time: req.body.responseTime,
    },
    accommodates: req.body.accommodates,
    beds: req.body.beds,
    bathrooms: req.body.bathrooms,
    price: req.body.price,
    cleaning_fee: req.body.cleaningFee,
    amenities: req.body.amenities.split(","),
  };
  let room;

  // inserting the object to the "rooms" collection
  room = await clientDB.db().collection("rooms").insertOne(roomData);

  if (room) {
    return res.redirect("/?filter=by_you");
  }
  res.cookie("error", "Something went wrong while hosting your room");
  res.redirect("/host/set-up-home");
};

module.exports = {
  get_hosthome,
  get_setuphome,
  add_newhome,
};
