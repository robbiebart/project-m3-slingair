const flight = document.getElementById("flight");
const seat = document.getElementById("seat");
const name = document.getElementById("name");
const email = document.getElementById("email");

fetch("/reservationInfo")
  .then((res) => res.text())
  .then((data) => {
    console.log("data", data);
    let parsed = JSON.parse(data).reservationInfo;
    console.log("parsed", parsed);

    flight.innerText = `${parsed.flight}`;
    seat.innerText = `${parsed.seat}`;
    name.innerText = `${parsed.givenName} ${parsed.surname}`;
    email.innerText = `${parsed.email}`;
  });
