// Requiring the MongoClient class from the mongodb package
const { MongoClient } = require("mongodb");

// Connecting to the mongo db database with the URI defined the .env filel
const clientDB = new MongoClient(process.env.MONGO_URI);

clientDB.on("connectionCreated", () => {
  console.log("Successfully connected to DB");
});

module.exports = { clientDB };
