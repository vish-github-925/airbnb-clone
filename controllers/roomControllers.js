const { ObjectID } = require("bson");
const { clientDB } = require("../config/dbConn");
const getRoom = async (req, res) => {
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
  res.render("RoomPage", {
    data: {
      userType: req.cookies.userType,
      username: req.cookies.user,
      error: req.cookies.error,
      room,
    },
  });
};
module.exports = { getRoom };
