const bookingModal = document.querySelector(".booking__confirmed");
const confirmBtn = document.querySelector(".pay__button");

confirmBtn.addEventListener("click", bookingConfirmed);
bookingModal.addEventListener("click", closeModal);
function bookingConfirmed() {
  document.body.style.overflowY = "hidden";
  if (bookingModal.classList.contains("modal--closed")) {
    bookingModal.classList.remove("modal--closed");
  }
  setTimeout(() => {
    // window.location.href = "/";
  }, 3000);
}
function closeModal() {
  document.body.style.overflowY = "scroll";
  bookingModal.classList.add("modal--closed");
}
