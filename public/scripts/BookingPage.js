const bookingModal = document.querySelector(".booking__confirmed");
const confirmBtn = document.querySelector(".pay__button");

// Confirming booking
confirmBtn.addEventListener("click", bookingConfirmed);

// close the booking modal
bookingModal.addEventListener("click", closeModal);

// function to make booking confirmation
function bookingConfirmed() {
  document.body.style.overflowY = "hidden";
  if (bookingModal.classList.contains("modal--closed")) {
    bookingModal.classList.remove("modal--closed");
  }
  setTimeout(() => {
    // window.location.href = "/";
  }, 3000);
}
// function to close the booking confirm modal
function closeModal() {
  document.body.style.overflowY = "scroll";
  bookingModal.classList.add("modal--closed");
}
