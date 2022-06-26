const mongoose = require("mongoose");
require("dotenv").config();
const uri = `mongodb+srv://Xcity:${process.env.MONGO_PASSWORD}@cluster0.eikpik6.mongodb.net/?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("Successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connection;
