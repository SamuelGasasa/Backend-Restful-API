const express = require("express");
const uuid = require("uuid");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());

// GET request to /b returns a list of objects
app.get("/b", (req, res) => {
  const files = fs.readdirSync("./Backend/tasks");
  const arr = [];
  if (files.length === 0) {
    res.send("you have no files");
  } else {
    try {
      files.forEach((file) => {
        arr.push(JSON.parse(fs.readFileSync(`./Backend/tasks/${file}`)));
      });
      res.send(arr);
    } catch (err) {
      res.status(500).send("There is a problem with the server.");
    }
  }
});

// GET request to /b/{id} returns the details of the object
app.get("/b/:id", (req, res) => {
  const { id } = req.params;
  if (!fs.existsSync(`./Backend/tasks/${id}.json`)) {
    res.status(400);
    res.statusMessage = "Invalid Bin Id provided";
    console.log("Invalid Bin Id provided");
    res.send();
  } else {
    fs.readFile(`./Backend/tasks/${id}.json`, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else res.send(data);
    });
  }
});
