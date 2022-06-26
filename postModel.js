const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    title: "string",
    content: "string",
  },
  {
    timestands: true,
  }
);
const Post = mongoose.model("POST", schema);
module.exports = Post;
