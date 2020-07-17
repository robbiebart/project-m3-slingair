"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");
const e = require("express");

const getFlight = (req, res) => {
  const { flightNum } = req.params;
  const flightData = flights[flightNum];
  flightData
    ? res.status(200).json({ status: 200, flightData })
    : res.status(404).json({ status: 404, message: "flight not found" });
};

const sendConfirmation = (req, res) => {
  console.log(req.body);
  const { givenName, surname, email, flight, seat } = req.body; // object deconstruction
  const reservation = { id: uuidv4(), ...req.body }; // this is like typing in the values from line 20, that would work too
  reservations.push(reservation);
  flights[flight].forEach((seatObj, index) => {
    if (seat === seatObj.id) {
      if (flights[flight][index].isAvailable === false) {
        res.status(404).send({ status: 404, message: "seat is taken" });
      } else {
        {
          flights[flight][index].isAvailable = false;
          res.status(200).send({ status: 200, reservation });
        }
      }
    }
  });
  // res.status(200).send({ status: 200, reservation });
  console.log("test 9");
};

const findReservationInfo = (req, res) => {
  const reservationInfo = reservations[reservations.length - 1];
  res.status(200).json({ reservationInfo });
};
/* 
is seat free, is email rly there
if you want to validate that its free, you can add "is it true" is isAvilable true, if it is
do 25, if it isn't return an error;
for email, loop thru reservations to look for email, if it exists say no
*/
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
  .post("/sendConfirmation", sendConfirmation)
  .get("/reservationInfo", findReservationInfo)

  .use((req, res) => res.send("Not Found"))
  .listen(8000, () => console.log(`Listening on port 8000`));
