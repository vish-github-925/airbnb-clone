const { ObjectID } = require("bson");

// requiring the db connection Object
const { clientDB } = require("../config/dbConn");

// controller function to get the BookingPage view
const getBookingPage = async (req, res) => {
  // getting the "id" of the room requested
  const { id } = req.params;
  let room;

  // db query to get the requested "id" room
  room = await clientDB
    .db()
    .collection("listingsAndReviews")
    .findOne({ _id: id });

  // if room is not found in the "listingsAndReviews" collection, getting it from the "rooms" collection
  if (!room) {
    room = await clientDB
      .db()
      .collection("rooms")
      .findOne({ _id: ObjectID(id) });
  }

  // rendering the "BookingPage" view with necessary data
  res.render("BookingPage", {
    data: { body: req.body, query: req.query, room },
  });
};
module.exports = {
  getBookingPage,
};
