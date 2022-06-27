const express = require("express");
const app = express();
const array = require("./array.json");
const path = require("path");
const fs = require("fs");
const db = require("./mongoose");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const postModel = require("./postModel");
const { json } = require("express");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var title = "";
var content = "";
// Connect to front End
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("new", (msg) => {
    title = msg[0];
    content = msg[1];
    try {
      const ans = postModel.create({ title, content });
      console.log(ans);
      app.get("/", (req, res) => {
        postModel
          .find()
          .then((result) => {
            res.send(result);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  });
});
// Crud Application

// Test
app.get("/array", async (req, res) => {
  res.json(array);
});
// Test
app.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await postModel.create({ title, content });
    res.json(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/clicked", async (req, res) => {
  try {
    const posts = await postModel.find();

    fs.writeFile("array.json", JSON.stringify(posts), (err) => {
      if (err) throw err;
      console.log("conplete");
    });
    console.log(posts[0].title, posts[0].content);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    res.json(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await postModel.findByIdAndUpdate(id, { title, content });
    res.json(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findByIdAndDelete(id);
    res.json("SuccessFully deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});
server.listen(process.env.PORT || 5000, () => {
  console.log("Listening on port 3001");
});
