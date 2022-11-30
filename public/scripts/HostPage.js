const headerAuth = document.querySelector(".header__options--setup");
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
closeModal.addEventListener("click", closeLoginSignupModal);

headerAuth.addEventListener("click", (e) => {
  document.documentElement.scrollTop = 0;
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

login?.addEventListener("click", openOrCloseLoginModal);
signUp?.addEventListener("click", openOrCloseSignupModal);
loginSignupModalBackdrop.addEventListener("click", closeLoginSignupModal);
loginSignupModal.addEventListener("click", (e) => e.stopPropagation());
// submitLoginSignupForm.addEventListener("click", (e) => {
//   e.preventDefault();
// });
function openOrCloseLoginModal() {
  modalHeaderText.textContent = "Log in";
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
function closeLoginSignupModal() {
  document.body.style.overflowY = "scroll";
  loginSignupModalBackdrop.classList.add("modal--closed");
}
const errorEle = document.querySelector(".error");
if (errorEle) {
  setTimeout(() => {
    errorEle.style.display = "block";
  }, 1000);
  setTimeout(() => {
    errorEle.style.display = "none";
  }, 10000);
}
