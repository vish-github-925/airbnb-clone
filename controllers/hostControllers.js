const { clientDB } = require("../config/dbConn");
const get_hosthome = (req, res) => {
  res.render("HostPage", {
    data: {
      userType: req.cookies.userType,
      username: req.cookies.user,
      error: req.cookies.error,
    },
  });
};

const get_setuphome = (req, res) => {
  res.render("SetupHomePage", {
    data: {
      userType: req.cookies.userType,
      username: req.cookies.user,
      error: req.cookies.error,
    },
  });
};

const add_newhome = async (req, res) => {
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
