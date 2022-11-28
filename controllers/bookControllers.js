const { clientDB } = require("../config/dbConn");

const getBookingPage = async (req, res) => {
  const { id } = req.params;

  const room = await clientDB
    .db()
    .collection("listingsAndReviews")
    .findOne({ _id: id });
  res.render("BookingPage", { data: { body: req.body, room } });
};
module.exports = {
  getBookingPage,
};
