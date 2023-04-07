//--------------- EXPRESS ---------------//
const express = require("express");
const app = express();
//-------------- JSON -------------------//
const countriesData = require("./countriesData.json");

//--------------- ROUTES ---------------//

//* Root page
app.get("/", (_req, res) => {
  res.status(200).send("This is Countries API");
});

//* Get all countries
app.get("/all", (_req, res) => {
  res.status(200).json({
    countriesData,
  });
});

//* Get a country by name
app.get("/country/:country", (req, res) => {
  const country = countriesData.find((countryName) => {
    return (
      countryName.name.common.toLowerCase().replace(" ", "") ===
      req.params.country.toLowerCase().replace(" ", "")
    );
  });

  res.status(200).json(country);
});

//* Get a country by capital
app.get("/capital/:capital", (req, res) => {
  const capital = countriesData.find((capitalName) => {
    return (
      capitalName.capital.toString().toLowerCase().replace(" ", "") ===
      req.params.capital.toLowerCase().replace(" ", "")
    );
  });

  res.status(200).json(capital);
});

//* Get a country by continent
app.get("/continent/:continent", (req, res) => {
  const countries = countriesData.filter((country) => {
    return (
      country.region.toLowerCase().replace(" ", "") ===
      req.params.continent.toLowerCase().replace(" ", "")
    );
  });

  res.status(200).json(countries);
});

//* Handle errors
app.get("*", (_req, res) => {
  res.status(404).send("Error 404 - Not found");
});
//----------- START SERVER ----------//
const port = 8000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
