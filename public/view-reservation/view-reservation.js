const flight = document.getElementById("flight");
const seat = document.getElementById("seat");
const name = document.getElementById("name");
const email = document.getElementById("email");
const getReservations = (event) => {
  event.preventDefault();
  console.log("test");

  const userId = event.target["userReservation"].value;
  console.log("userID", userId);
  //Step 1: get userID from the textbox
  //Step2: Fetch using /view-reservation/${userID}
  //Step 3: Once youget a responnse back, it's probably gonna be a single object/or maybe even an array
  //use that info to append new elements on this page in the contents section
  fetch(`/view-reservation/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      flight.innerText = `${data.userInfo.flight}`;
      seat.innerText = `${data.userInfo.seat}`;
      name.innerText = `${data.userInfo.givenName} ${data.userInfo.surname}`;
      email.innerText = `${data.userInfo.email}`;
    });
};

// fetch("/view-reservation/2")
//   .then((res) => res.text())
//   .then((data) => {
//     console.log("data", data);
//     let parsed = JSON.parse(data).reservationInfo;
//     console.log("parsed", parsed);

//     flight.innerText = `${parsed.flight}`;
//     seat.innerText = `${parsed.seat}`;
//     name.innerText = `${parsed.givenName} ${parsed.surname}`;
//     email.innerText = `${parsed.email}`;
//   });

// pass userID as a param
// or pass an object as a body in which there's the userID

/*
target input box
get element by id of userreservation
whatever you get you fetch with that
when that gets you back a response, you append stuff onto the page to display the data of the response
*/
