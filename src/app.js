const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//define path for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Deep Vanapariya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Deep Vanapariya",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: " This is Help page",
    title: "Help",
    name: "Deep Vanapariya",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
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

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Deep vanapariya",
    errorMessage: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Deep vanapariya",
    errorMessage: "page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
