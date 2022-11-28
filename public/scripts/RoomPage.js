const headerAuth = document.querySelector(".header__options--auth");
const headerAuthOptions = document.querySelector(
  ".header__options--auth-more-options"
);
const login = document.querySelector(".login");
const signUp = document.querySelector(".sign-up");
const signUpForm = document.querySelector(".login-signup__form.signup");
const loginForm = document.querySelector(".login-signup__form.login");
const loginSignupModal = document.querySelector(".login-signup__modal");
const submitLoginSignupForm = document.querySelector(
  ".login-signup__form--submit--primary"
);

const loginSignupModalBackdrop = document.querySelector(
  ".login-signup__modal__backdrop"
);
const closeModal = document.querySelector(".close--modal");
closeModal.addEventListener("click", closeLoginSignupModal);
const nightsOption = document.querySelector("#room__guests");
const selectedNights = document.querySelector(
  ".calculation__item__selected__nights"
);
const checkInDate = document.querySelector("#room__checkin");
const checkOutDate = document.querySelector("#room__checkout");

selectedNights.textContent = nightsOption.value;

checkInDate.addEventListener("change", (e) => console.log(e.target.value));
checkOutDate.addEventListener("change", (e) => console.log(e.target.value));
headerAuth.addEventListener("click", (e) => {
  e.stopPropagation();
  if (headerAuthOptions.classList.contains("auth--closed")) {
    headerAuthOptions.classList.remove("auth--closed");
  } else {
    headerAuthOptions.classList.add("auth--closed");
  }
});
window.addEventListener("click", () => {
  headerAuthOptions.classList.add("auth--closed");
});
login.addEventListener("click", openOrCloseLoginModal);
signUp.addEventListener("click", openOrCloseSignupModal);
loginSignupModalBackdrop.addEventListener("click", closeLoginSignupModal);
loginSignupModal.addEventListener("click", (e) => e.stopPropagation());
// submitLoginSignupForm.addEventListener("click", (e) => {
//   e.preventDefault();
// });
function openOrCloseLoginModal() {
  signUpForm.classList.add("login-signup__form--disabled");
  loginForm.classList.remove("login-signup__form--disabled");
  if (!loginSignupModalBackdrop.classList.contains("modal--closed")) {
    loginSignupModalBackdrop.classList.add("modal--closed");
    document.body.style.overflowY = "scroll";
  } else {
    loginSignupModalBackdrop.classList.remove("modal--closed");
    document.body.style.overflowY = "hidden";
  }
}
function openOrCloseSignupModal() {
  signUpForm.classList.remove("login-signup__form--disabled");
  loginForm.classList.add("login-signup__form--disabled");
  if (!loginSignupModalBackdrop.classList.contains("modal--closed")) {
    loginSignupModalBackdrop.classList.add("modal--closed");
    document.body.style.overflowY = "scroll";
  } else {
    loginSignupModalBackdrop.classList.remove("modal--closed");
    document.body.style.overflowY = "hidden";
  }
}
function closeLoginSignupModal() {
  loginSignupModalBackdrop.classList.add("modal--closed");
}
