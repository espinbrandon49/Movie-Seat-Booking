let seats = [];
const seatInputs = Array.from(document.getElementsByClassName("seat"));
const setSeats = () => localStorage.setItem("seats", seats);

if (!localStorage.seats) {
  setSeats()
} else {
  localStorage.getItem("seats")
    .split(",")
    .map(seat => {
      if (!seats.includes(seat)) {
        seats.push(seat)
        seatInputs.forEach(e => {
          if (e.id == seat) e.classList.add("occupied");
        })
      }
    });
  setSeats();
}

seatInputs.forEach(seat => {
  seat.addEventListener("click", (event) => {
    if ((event.target) && (!seats.includes(seat.id))) {
      seats.push(seat.id)
      seat.classList.add("selected")
    } else {
      seats.map(e => {
        if (e == seat.id && (event.target.getAttribute("class") != "seat occupied")) {
          seat.classList.remove("selected")
          seats.splice(seats.indexOf(e), 1)
        }
      })
    }
    setSeats(); price();
  })
})

function price() {
  let seatCount = 0; let price = 0;
  const movies = document.getElementById("movies")

  seatInputs.forEach(e => {
    if (e.getAttribute("class") == "seat selected") seatCount++;
  })

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].selected) {
      price += (movies[i].value * seatCount)
    }
  }

  document.getElementById("seatCount").innerText = seatCount;
  document.getElementById("price").innerText = price;
}
console.log(movies)
document.getElementById("movies").addEventListener("change", () => price());
