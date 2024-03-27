const person = {
  firstName: "John",
  lastName: "Doe",
  getFullName: function () {
    console.log("getFullName", this);
    return this.firstName + " " + this.lastName;
  }
};

const displayName = function () {
  console.log("displayName", this);
  const resultElement = document.querySelector("#result");
  resultElement.textContent = this.getFullName();
};

// doesn't work. What is 'this' in the function?
// document.querySelector("#nameButton").addEventListener("click", displayName);

// Bind the logName function to the person object
const boundDisplayName = displayName.bind(person);

// use the bound function
// document
//   .querySelector("#nameButton")
//   .addEventListener("click", boundDisplayName);

// what if we call the function directly?
// document
//   .querySelector("#nameButton")
//   .addEventListener("click", person.getFullName);

// document.querySelector("#nameButton").addEventListener("click", function () {
//   console.log("anonymous function", this);
//   person.getFullName();
// });

document.querySelector("#nameButton").addEventListener("click", () => {
  console.log("arrow function", this);
  person.getFullName();
});
