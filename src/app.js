const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { query } = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
console.log(path.join(__dirname, "../templates/partials"));

//Define path for Express Config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and vies location
hbs.registerPartials(partialsPath);
app.set("view engine", "hbs");
app.set("views", viewPath);

//setup public directory path to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Shreya",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an Address",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Shreya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Shreya",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error404", {
    title: "Error",
    error: "Article Not Found",
    name: "Shreya",
  });
});

app.get("*", (req, res) => {
  res.render("error404", {
    title: "404 Error",
    error: "Page Not Found",
    name: "Shreya",
  });
});

app.listen(3000, () => {
  console.log("Express listening on port 3000");
});
