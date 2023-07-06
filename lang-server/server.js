const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const feedback = require("./feedback");

app.use(cors());
app.use(express.json());

app.post("/api/feedback", (req, res) => {
  const { id, positive, negative } = req.body;
  feedback.saveFeedback(id, positive > 0);
  res.sendStatus(200);
});

app.get("/jsons/a1", (req, res) => {
  fs.readFile("a1.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Server error" });
      return;
    }

    const words = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    res.json(randomWord);
  });
});
app.get("/jsons/a2", (req, res) => {
  fs.readFile("a2.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Server error" });
      return;
    }

    const words = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    res.json(randomWord);
  });
});
app.get("/jsons/b1", (req, res) => {
  fs.readFile("b1.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Server error" });
      return;
    }

    const words = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    res.json(randomWord);
  });
});
app.get("/jsons/b2", (req, res) => {
  fs.readFile("b1.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Server error" });
      return;
    }

    const words = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    res.json(randomWord);
  });
});
app.get("/jsons/c1", (req, res) => {
  fs.readFile("c1.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Server error" });
      return;
    }

    const words = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    res.json(randomWord);
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
