const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/article");
const methodOverride = require("method-override");
const app = express();
const Url = require("./myUrl");
const Articles = require("./models/article");
const fetch = require("node-fetch");
mongoose.connect(Url.mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  // let a = "happy";
  // // res.send('Hello world');
  // fetch("https://aplet123-wordnet-search-v1.p.rapidapi.com/master?word=" + a, {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "d00d745d82msh49a483b75ee89fdp14464ajsneb0658917638",
  //     "x-rapidapi-host": "aplet123-wordnet-search-v1.p.rapidapi.com",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     let d = JSON.stringify(data.definition);
  //     //   console.log(d.split(";"));
  //     let arr = d.split(";");
  //     res.send(arr[0]);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  const article = await Articles.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: article });
});
app.use("/articles", articleRouter);
app.listen(process.env.PORT || 3000);
