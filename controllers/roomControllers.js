const { ObjectID } = require("bson");

// requiring the db connection Object
const { clientDB } = require("../config/dbConn");

// controller function to get the requested room
const getRoom = async (req, res) => {
  // getting the "id" from the params
  const { id } = req.params;
  let room;

  // db query to get the room of the requested room "id" in the "listingsAndReviews" collection
  room = await clientDB
    .db()
    .collection("listingsAndReviews")
    .findOne({ _id: id });

  // if there is no room, making db query in the "rooms" collection to get the room details created by the user
  if (!room) {
    room = await clientDB
      .db()
      .collection("rooms")
      .findOne({ _id: ObjectID(id) });
  }

  // rendering the "RoomPage" view with necessary data
  res.render("RoomPage", {
    data: {
      username: req.cookies.user,
      error: req.cookies.error,
      room,
    },
  });
};
module.exports = { getRoom };
