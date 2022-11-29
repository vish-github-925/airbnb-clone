// requiring the DB connection object
const { clientDB } = require("../config/dbConn");

// controller function for getting homepage
const get_homepage = async (req, res) => {
  const { filter, destination } = req.query;
  let selectedFilter;
  let skip;

  // if there is nor "filter" query param, make skip = 0 and selectedFilter = New
  if (!filter) {
    skip = 0;
    selectedFilter = "New";
  } else {
    // if there is "filter" query param, make skip and selectedFilter respectively to fetch rooms from the database
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

  // if the query param has "destination", get the rooms which are of the destination country
  if (destination) {
    // db query to get the 200 rooms
    roomsQuery = clientDB
      .db()
      .collection("listingsAndReviews")
      .find({})
      .limit(200);
    rooms = await roomsQuery.toArray();

    // from the 200 rooms, filtering the rooms which are from the destination query
    rooms = rooms.filter((room) => {
      return room.address.country === destination;
    });
  } else {
    // if there is no "destination" query param, querying db by limiting to 16 rooms,
    roomsQuery = clientDB
      .db()
      .collection("listingsAndReviews")
      .find({})
      .skip(skip)
      .limit(16);
    rooms = await roomsQuery.toArray();
  }

  // if "filter" param is "by_you", fetching the rooms created by the logged in user and displaying in the homepage
  if (filter === "by_you") {
    // query param to fetch the rooms from the "rooms" collection
    roomsQuery = clientDB.db().collection("rooms").find({});
    rooms = await roomsQuery.toArray();

    // filtering out the rooms which are created by the logged in user
    rooms = rooms.filter((room) => {
      return room.host.host_name === req.cookies.user;
    });
    selectedFilter = "Your homes";
  }

  // rendering the "HomePage" view, by passing the necessary data
  res.render("HomePage", {
    data: {
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

module.exports = {
  get_homepage,
};
