const { MongoClient } = require("mongodb");
const clientDB = new MongoClient(process.env.MONGO_URI);
clientDB.on("connectionCreated", () => {
  console.log("Successfully connected to DB");
});
module.exports = { clientDB };
