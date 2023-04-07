//--------------- EXPRESS ---------------//
const express = require("express");
const app = express();
//-------------- JSON -------------------//
const countriesData = require("./countriesData.json");

//--------------- ROUTES ---------------//
//* Get all countries
app.get("/all", (_req, res) => {
  res.json({
    status: "success",
    data: countriesData,
  });
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
