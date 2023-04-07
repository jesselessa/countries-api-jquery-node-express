//------------- EXPRESS --------------//
import express from "express";
const app = express();

//----------- START SERVER ----------//
const port = 8000;
app.listen(port, ()=> {console.log(`Server listening at http://localhost:${port}`)})
