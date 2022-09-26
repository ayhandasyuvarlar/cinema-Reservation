const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");
getFromLocalStorage();
calculateTotal();
container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");
    calculateTotal();
  }
});

select.addEventListener("change", function (e) {
  calculateTotal();
  optionsText()
});

function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected");

  const selectedSeatsArr = [];
  const seatsArr = [];

  selectedSeats.forEach(function (seat) {
    selectedSeatsArr.push(seat);
  });

  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });

  let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  });
  let selectedSeatCount = selectedSeats.length;
  count.innerHTML = `<span>${selectedSeatCount}</span> total reservation and total price <span>
  ${select.value * selectedSeatCount}</span> `;

  saveToLocalStorage(selectedSeatIndexs);
}
function getFromLocalStorage() {
  const selecectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selecectedSeats != null && selecectedSeats.length > 0) {
    seats.forEach((item, index) => {
      if (selecectedSeats.indexOf(index) > -1) {
        item.classList.add("selected");
      }
    });
  }

  const movieIndex = localStorage.getItem("selectedMovieIndex");
  if (movieIndex != null) {
    select.selectedIndex = movieIndex;
  }
}
function saveToLocalStorage(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}
select.addEventListener("selectionchange", function (e) {
  calculateTotal();
  console.log(this.innerText);
});


const optionsText = () =>{
    let optionsText = select.options[select.selectedIndex].text;
    let screen = (document.querySelector(".screen").innerText = optionsText);
}
optionsText()