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
const modalHeaderText = document.querySelector(".modal--header__heading");
const loginToSignupBtn = document.querySelector(".login__to-signup__btn");

const searchHeader = document.querySelector(".header__search");
const roomsSearch = document.querySelector(".search__header");
const body = document.body;

// close modal on clicking the outside of the modal
closeModal.addEventListener("click", closeLoginSignupModal);

// Open or close the search by country filter
searchHeader.addEventListener("click", (e) => {
  if (roomsSearch.classList.contains("search--close")) {
    roomsSearch.classList.remove("search--close");
  } else {
    roomsSearch.classList.add("search--close");
  }
});

// open or close the authentication field card
headerAuth.addEventListener("click", (e) => {
  e.stopPropagation();
  if (headerAuthOptions.classList.contains("auth--closed")) {
    headerAuthOptions.classList.remove("auth--closed");
  } else {
    headerAuthOptions.classList.add("auth--closed");
  }
});

// close the authentication field card, on clicking outside of the auth field
window.addEventListener("click", () => {
  headerAuthOptions.classList.add("auth--closed");
});

// if login element is present, open or close the login modal
login?.addEventListener("click", openOrCloseLoginModal);

// if signup element is present, open or close the signup modal
signUp?.addEventListener("click", openOrCloseSignupModal);

// closing the login or signup modal on clicking outside of the modal
loginSignupModalBackdrop?.addEventListener("click", closeLoginSignupModal);

// stopping the propagation, to not close the login or signup modal on clicking on the modal itself
loginSignupModal?.addEventListener("click", (e) => e.stopPropagation());
// submitLoginSignupForm.addEventListener("click", (e) => {
//   e.preventDefault();
// });

// function to open or close login modal
function openOrCloseLoginModal() {
  modalHeaderText.textContent = "Log in";
  signUpForm.classList.add("login-signup__form--disabled");
  loginForm.classList.remove("login-signup__form--disabled");
  if (!loginSignupModalBackdrop.classList.contains("modal--closed")) {
    loginSignupModalBackdrop.classList.add("modal--closed");
    body.style.overflow = "scroll";
  } else {
    loginSignupModalBackdrop.classList.remove("modal--closed");
    body.style.overflow = "hidden";
  }
}

// function to open or close signup modal
function openOrCloseSignupModal() {
  modalHeaderText.textContent = "Sign Up";
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

// function to close the login or signup modal
function closeLoginSignupModal() {
  document.body.style.overflowY = "scroll";

  loginSignupModalBackdrop.classList.add("modal--closed");
}

// displaying the error element only when the error is present and closing after 5 seconds
const errorEle = document.querySelector(".error");
if (errorEle) {
  setTimeout(() => {
    errorEle.style.display = "block";
  }, 1000);
  setTimeout(() => {
    errorEle.style.display = "none";
  }, 5000);
}
