document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var error = "";

    if (name === "") {
      error += "Name is required.\n";
    }

    if (email === "") {
      error += "Email is required.\n";
    } else if (!validateEmail(email)) {
      error += "Please enter a valid email address.\n";
    }

    if (error) {
      event.preventDefault();
      document.getElementById("form-error").textContent = error;
    }
  });

function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
