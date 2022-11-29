const { ObjectID } = require("bson");
const { clientDB } = require("../config/dbConn");

const getBookingPage = async (req, res) => {
  const { id } = req.params;
  let room;
  room = await clientDB
    .db()
    .collection("listingsAndReviews")
    .findOne({ _id: id });

  if (!room) {
    room = await clientDB
      .db()
      .collection("rooms")
      .findOne({ _id: ObjectID(id) });
  }
  res.render("BookingPage", {
    data: { body: req.body, query: req.query, room },
  });
};
module.exports = {
  getBookingPage,
};
