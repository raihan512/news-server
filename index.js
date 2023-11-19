const express = require("express");
var cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

const categories = require("./data/categories.json");
const news = require("./data/news.json");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all categories
app.get("/categories", (req, res) => {
  res.send(categories);
});

// Get all news with choosen category
app.get("/category/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id === 0) {
    res.send(news);
  } else {
    const selectedCategory = news.filter(
      (allNews) => allNews.category_id === id
    );
    res.send(selectedCategory);
  }
});

// Get selected news
app.get("/news/:id", (req, res) => {
  const id = req.params.id;
  const selectedNews = news.find((newsItem) => newsItem._id === id);
  res.send(selectedNews);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
