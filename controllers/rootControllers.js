const { clientDB } = require("../config/dbConn");
const path = require("path");
const get_homepage = async (req, res) => {
  const { filter, destination } = req.query;
  let selectedFilter;
  let skip;
  if (!filter) {
    skip = 0;
    selectedFilter = "New";
  } else {
    if (filter == "new") {
      skip = 0;
      selectedFilter = "New";
    } else if (filter == "top_of_the_world") {
      skip = 16;
      selectedFilter = "Top of the world";
    } else if (filter == "trending") {
      skip = 32;
      selectedFilter = "Trending";
    } else if (filter == "private_rooms") {
      skip = 48;
      selectedFilter = "Private Rooms";
    } else {
      skip = 60;
      selectedFilter = "Play";
    }
  }
  let roomsQuery;
  let rooms;
  if (destination) {
    roomsQuery = clientDB
      .db()
      .collection("listingsAndReviews")
      .find({})
      .limit(200);
    rooms = await roomsQuery.toArray();
    rooms = rooms.filter((room) => {
      return room.address.country === destination;
    });
  } else {
    roomsQuery = clientDB
      .db()
      .collection("listingsAndReviews")
      .find({})
      .skip(skip)
      .limit(16);
    rooms = await roomsQuery.toArray();
  }

  if (filter === "by_you") {
    roomsQuery = clientDB.db().collection("rooms").find({});
    rooms = await roomsQuery.toArray();
    rooms = rooms.filter((room) => {
      return room.host.host_name === req.cookies.user;
    });
    selectedFilter = "Your homes";
  }
  res.render("Homepage", {
    data: {
      userType: req.cookies.userType,
      username: req.cookies.user,
      error: req.cookies.error,
      selectedFilter,
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
