const { clientDB } = require("../config/dbConn");
const getRoom = async (req, res) => {
  const { id } = req.params;
  const room = await clientDB
    .db()
    .collection("listingsAndReviews")
    .findOne({ _id: id });
  res.render("RoomPage", {
    data: {
      room,
    },
  });
};
module.exports = { getRoom };
