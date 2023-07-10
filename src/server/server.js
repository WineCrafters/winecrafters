require("dotenv").config();

// ----------------IMPORTS---------------------//
// import express from 'express';
// import path from 'path';
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
//import type { Request, Response, NextFunction } from 'express'; // typescript types

//----------------SET UP EXPRESS APP----------//

const port = 3000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --------- SERVING STATIC FILES -----------//

app.use(express.static("public", { extensions: ["css"] }));
app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(express.static("client"));



app.use(({ code, error }, req, res, next) => {
  res.status(code).json({ error: error.message });
});




// ------------GLOBAL ERROR HANDLER ---------------//

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error caught in global handler',
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  console.log(err);
  return res.status(errorObj.status).json(errorObj.message);
});


module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
