"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");

const getFlight = (req, res) => {
  const { flightNum } = req.params;
  const flightData = flights[flightNum];
  flightData
    ? res.status(200).json({ status: 200, flightData })
    : res.status(404).json({ status: 404, message: "flight not found" });
};

const postFunction = (req, res) => {
  console.log("req", req.body);
  let seatChoice = req.body.seat;
  let userInfo = req.body.userInfo;
  console.log("test2");
  const flightNum = req.body.flight;
  console.log("test3");
  reservations.push(userInfo);
  console.log("test4");
  for (let i = 0; i === flights[flightNum].length - 1; i++) {
    console.log("test5");
    if (flights[flightNum][i].id === req.body.id) {
      flights[flightNum][i].isAvailable = false;
    }
  }
  console.log("test8");
  res.status(200).send({ status: 200, userInfo: userInfo });
  console.log("test 9");
};
// based on flight number, return all seating
/*
at FE user presented with dropdown/buttons/radio to select a flight, and request seating avail
on that flight; here we have to receive flight number choice and return seating avail on that
flight

get flight number, respond with seating avail
*/

/*
once the user has chosen a seat with the info sent to them above, display the seating input
as well as the form requesting user's info
user clicks confirm and those are sent back to BE

confirm posts seat number to flightSeating.js (updates that object;)
it also adds an object to the reservations array with firstname/lastname/email/seat number/id
this will be a bigger post function
*/

/*
the seating input and userinfo is received, the info is updated, and "success" response redirects
the user to /confirmed.html

The confirmed page should display a confirmation message to the user with the info that they 
entered on the previous screen.
*/

/*
/view-reservation
a view reservations page displaying reservation info
this page doesn't exist and the FE needs to be designed
*/

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("/flightsA/:flightNum", getFlight)
  .post("/flights", postFunction)

  .use((req, res) => res.send("Not Found"))
  .listen(8000, () => console.log(`Listening on port 8000`));
