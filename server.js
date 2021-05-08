const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/article");
const methodOverride = require("method-override");
const app = express();
const Url = require("./myUrl");
const Articles = require("./models/article");
const fetch = require("node-fetch");
mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const article = await Articles.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: article });
});
app.use("/articles", articleRouter);
app.listen(process.env.PORT || 3000);
