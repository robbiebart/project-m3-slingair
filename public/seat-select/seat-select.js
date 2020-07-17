const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");

let selection = "";

const renderSeats = (seatsArray) => {
  document.querySelector(".form-container").style.display = "block";

  const alpha = ["A", "B", "C", "D", "E", "F"];
  for (let r = 1; r < 11; r++) {
    const row = document.createElement("ol");
    row.classList.add("row");
    row.classList.add("fuselage");
    seatsDiv.appendChild(row);
    for (let s = 1; s < 7; s++) {
      const seatNumber = `${r}${alpha[s - 1]}`;
      const seat = document.createElement("li");
      let foundSeat = seatsArray.find((seat) => {
        return seat.id === seatNumber;
      });

      // Two types of seats to render
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;

      // TODO: render the seat availability based on the data...
      if (foundSeat.isAvailable === true) {
        seat.innerHTML = seatAvailable;
        row.appendChild(seat);
      } else {
        seat.innerHTML = seatOccupied;
        row.appendChild(seat);
      }

      //   seat.innerHTML = seatAvailable;
      //   row.appendChild(seat);
    }
  }
  /*
either a find pm the array you're passing, find that seat, once found check if isAvailable
*/
  let seatMap = document.forms["seats"].elements["seat"];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = (event) => {
  const flightNumber = flightInput.value;
  let flightNumberTest = flightNumber.split("");

  if (
    flightNumberTest[0] === "S" &&
    flightNumberTest[1] === "A" &&
    !isNaN(Number(flightNumber[2])) &&
    !isNaN(Number(flightNumber[3])) &&
    !isNaN(Number(flightNumber[4]))
  ) {
    console.log("toggleFormContent: ", flightNumber);
    fetch(`/flightsA/${flightNumber}`)
      .then((res) => res.json())
      .then((data) => {
        let seatsToRender = data.flightData;
        renderSeats(seatsToRender);
      });
  } else {
    window.alert("invalid flight number");
  }
  // TODO: contact the server to get the seating availability
  //      - only contact the server if the flight number is this format 'SA###'.
  //      - Do I need to create an error message if the number is not valid?

  // TODO: Pass the response data to renderSeats to create the appropriate seat-type.
};

const handleConfirmSeat = (event) => {
  event.preventDefault();
  // TODO: everything in here!
  fetch("/sendConfirmation", {
    method: "POST",
    body: JSON.stringify({
      givenName: document.getElementById("givenName").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then((data) => {
      let parsed = JSON.parse(data);
      if (parsed.status === 200) {
        window.location.href = "http://localhost8000/confirmed";
      }
    });
};

flightInput.addEventListener("blur", toggleFormContent);
