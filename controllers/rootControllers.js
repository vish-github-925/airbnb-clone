const { clientDB } = require("../config/dbConn");
const path = require("path");
const get_homepage = async (req, res) => {
  const { filter } = req.query;
  let skip;
  if (!filter) {
    skip = 0;
  } else {
    if (filter == "new") {
      skip = 0;
    } else if (filter == "top_of_the_world") {
      skip = 16;
    } else if (filter == "trending") {
      skip = 32;
    } else if (filter == "private_rooms") {
      skip = 48;
    } else {
      skip = 60;
    }
  }
  const roomsQuery = clientDB
    .db()
    .collection("listingsAndReviews")
    .find({})
    .skip(skip)
    .limit(16);
  const rooms = await roomsQuery.toArray();
  res.render("Homepage", {
    data: {
      userType: req.cookies.userType,
      username: req.cookies.user,
      error: req.cookies.error,
      rooms,
      filters: ["New", "Top of the world", "Trending", "Private Rooms", "Play"],
      icons: [
        "key",
        "landscape",
        "local_fire_department",
        "nest_multi_room",
        "golf_course",
      ],
    },
  });
};
const get_user = (req, res) => {
  res.render("user");
};
const get_host = (req, res) => {
  res.render("host");
};
module.exports = {
  get_user,
  get_host,
  get_homepage,
};
