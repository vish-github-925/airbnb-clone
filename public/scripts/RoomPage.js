const headerAuth = document.querySelector(".header__options--auth");
const headerAuthOptions = document.querySelector(
  ".header__options--auth-more-options"
);
const modalHeaderText = document.querySelector(".modal--header__heading");
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

const amountPerNight = document.querySelector(".per__night");
const totalAmount = document.querySelector(".total__amount");
const taxAmount = document.querySelector(".tax__amount");
const cleaningFeeText = document.querySelector(".cleaning__fee__text");
const cleaningFeeValue = document.querySelector(".cleaning__fee__value");
const bookRoomForm = document.querySelector(".book__room__form");

const roomLogout = document.querySelector(".room__logout");

roomLogout?.setAttribute("href", `${window.location.pathname}/auth/logout`);
loginForm.setAttribute("action", `${window.location.pathname}/auth/login`);
signUpForm.setAttribute("action", `${window.location.pathname}/auth/signup`);

checkInDate.addEventListener("change", (e) => console.log(e.target.value));
checkOutDate.addEventListener("change", (e) => {
  const cinDate = new Date(checkInDate.value);
  const coutDate = new Date(e.target.value);

  let diffDates = coutDate.getTime() - cinDate.getTime();
  diffDates = diffDates / (1000 * 3600 * 24) + 1;

  selectedNights.textContent = diffDates;
  let usAmount = amountPerNight.textContent.split(".")[0].slice(3);
  totalAmount.textContent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Number(usAmount) * 82 * diffDates);

  if (cleaningFeeText) {
    cleaningFeeValue.textContent = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(Number(cleaningFeeText?.textContent) * 82);
  }
  if (cleaningFeeText) {
    taxAmount.textContent = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(
      Number(cleaningFeeText.textContent) * 82 +
        Number(usAmount * 82 * diffDates)
    );
  } else {
    taxAmount.textContent = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(Number(usAmount * 82 * diffDates));
  }
  if (cleaningFeeText) {
    bookRoomForm.setAttribute(
      "action",
      `/book/${window.location.pathname.split("/")[2]}?amount_for_nights=${
        totalAmount.textContent
      }&cleaning_fee=${cleaningFeeValue.textContent}&total_amount=${
        taxAmount.textContent
      }`
    );
  } else {
    bookRoomForm.setAttribute(
      "action",
      `/book/${window.location.pathname.split("/")[2]}?amount_for_nights=${
        totalAmount.textContent
      }&total_amount=${taxAmount.textContent}`
    );
  }
});
totalAmount.textContent = totalAmount.textContent = new Intl.NumberFormat(
  "en-US",
  {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }
).format(Number(amountPerNight.textContent.split(".")[0].slice(3)) * 82);
if (cleaningFeeText) {
  cleaningFeeValue.textContent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Number(cleaningFeeText?.textContent) * 82);
}

if (cleaningFeeText) {
  taxAmount.textContent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(
    Number(cleaningFeeText.textContent) * 82 +
      Number(amountPerNight.textContent.split(".")[0].slice(3)) * 82
  );
} else {
  taxAmount.textContent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Number(amountPerNight.textContent.split(".")[0].slice(3)) * 82);
}
selectedNights.textContent = 1;
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
