const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
//--------------- DATA ------------------//
const countriesData = require("./database/countriesData.json");

//------------- MIDDLEWARES -------------//
app.use(cors());
app.use(express.static("public"));
// app.use("/css", express.static(__dirname + "public/css"));

//--------- SET VIEWS WITH EJS ---------//
app.set("views", "./views");
app.set("view engine", "ejs");

//--------------- ROUTES ---------------//
//* Root page
app.get("/", (_req, res) => {
  res.render("index");
  // res.sendFile(__dirname + "/views/index.html");
});

//* Get all countries
app.get("/all", (_req, res) => {
  let countries;

  try {
    countries = countriesData.map((country) => {
      return country;
    });

    return res.status(200).json(countries);
  } catch (error) {
    console.log(error);
  }
});

//* Get country by name
app.get("/country/:country", (req, res) => {
  let countries;

  try {
    countries = countriesData.filter((country) => {
      return (
        country.name.common
          .normalize("NFD") // Converts string to a normalized Unicode format
          .replace(/[\u0300-\u036f]/g, "") // Replaces diacritical marks in the given Unicode range by empty strings
          .replace(/\s+/g, "") // Removes white spaces
          .toLowerCase() ===
        req.params.country
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "")
          .toLowerCase()
      );
    });

    return res.status(200).json(countries);
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
});

//* Get country by capital
app.get("/capital/:capital", (req, res) => {
  let countries;

  try {
    countries = countriesData.filter((country) => {
      return (
        (country.capital || "") // Fixes bug "cannot read properties of undefined"
          .toString()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "")
          .toLowerCase() ===
        req.params.capital
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "")
          .toLowerCase()
      );
    });

    return res.status(200).json(countries);
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
});

//* Get countries by continent
app.get("/continent/:continent", (req, res) => {
  let countries;

  try {
    countries = countriesData.filter((country) => {
      return (
        country.region.toLowerCase().replace(" ", "") ===
        req.params.continent.toLowerCase().replace(" ", "")
      );
    });
    return res.status(200).json(countries);
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
});

//* Handle errors
app.get("*", (_req, res) => {
  res.status(404).send("Error 404 - Not found");
});
//----------- START SERVER ----------//
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
