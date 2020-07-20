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

const returnUserInfoFromUserId = (req, res) => {
  const id = req.params.userID;
  console.log("id", id);
  const userInfo = reservations.find((reservation) => {
    if (reservation["id"] === id) {
      console.log("reservation id", reservation["id"]);
      return reservation;
    }
  });
  res.status(200).json({ userInfo });
};

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
  .get("/view-reservation/:userID", returnUserInfoFromUserId)
  .use((req, res) => res.send("Not Found"))
  .listen(8000, () => console.log(`Listening on port 8000`));
