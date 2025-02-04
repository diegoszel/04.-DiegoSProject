export const contactUs = () => {

const fullName = document.getElementById("nameField");
const fullNameHelper = document.getElementById("fullName-helper");
const email = document.getElementById("emailField");
const emailHelper = document.getElementById("email-helper");
const phone = document.getElementById("phoneField");
const phoneHelper = document.getElementById("phone-helper");
const request = document.getElementById("requestField");
const requestHelper = document.getElementById("request-helper");

fullName.addEventListener("input", (e) => {
  const value = e.target.value;
  if (value.trim().length < 3) {
    fullNameHelper.innerText = "Name must be at least 3 characters long";
    if (!fullName.classList.contains("error")) {
      fullName.classList.add("error");
    }
  } else {
    fullNameHelper.innerText = "";
    fullName.classList.remove("error");
  }
});

email.addEventListener("input", (e) => {
  const value = e.target.value;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailRegex.test(value)) {
    emailHelper.innerText = "Email must be a valid email address";
    if (!email.classList.contains("error")) {
      email.classList.add("error");
    }
  } else {
    emailHelper.innerText = "";
    email.classList.remove("error");
  }
});

phone.addEventListener("input", (e) => {
  const value = e.target.value;
  if (value.length < 10) {
    phoneHelper.innerText = "Phone number must be at least 10 characters long";
    if (!phone.classList.contains("error")) {
      phone.classList.add("error");
    }
  } else {
    phoneHelper.innerText = "";
    phone.classList.remove("error");
  }
});

// request field at least 50 characters long and at most 270 characters long
request.addEventListener("input", (e) => {
  const value = e.target.value;
  if (value.length < 50 || value.length > 270) {
    requestHelper.innerText =
      "Request must be at least 50 characters long and at most 270 characters long";
    if (!request.classList.contains("error")) {
      request.classList.add("error");
    }
  } else {
    requestHelper.innerText = "";
    request.classList.remove("error");
  }
})

/* submit button
- check if all fields are valid
- if all fields are valid, enable the submit button
- if any field is invalid, prevent the form from submitting
- display messages if was submitted successfully or not
- clear the form after submission
*/

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", (e) => {
  if (
    fullName.classList.contains("error") ||
    email.classList.contains("error") ||
    phone.classList.contains("error")
  ) {
    e.preventDefault();
    alert("Please fill out the form correctly");
  } else {
    alert("Form submitted successfully");
    fullName.value = "";
    email.value = "";
    phone.value = "";
  }
});

};
