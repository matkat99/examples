function randomOutOf(num) {
  return Math.floor(Math.random() * num);
}

function dieRoller(num) {
  return function () {
    return Math.floor(Math.random() * num) + 1;
  };
}

var d4 = dieRoller(4);
let d6 = dieRoller(6);
let d8 = dieRoller(8);
console.log("A roll of the D4: " + d4()); // 1 - 4
console.log("Another roll of the D4: " + d4()); //  1 - 4

function multiply(a) {
  return function (b) {
    return a * b;
  };
}

// Usage
const multiplyByTwo = multiply(2);
console.log(multiplyByTwo(3)); // Output: 6

function logger(prefix) {
  return function (message) {
    console.log(`[${prefix}] ${message}`);
  };
}

// Usage
const logInfo = logger("INFO");
logInfo("This is an information message"); // Output: [INFO] This is an information message

function formatCurrency(currencySymbol) {
  return function (amount) {
    return `${currencySymbol}${amount.toFixed(2)}`;
  };
}

// Usage
const formatUSD = formatCurrency("$");
console.log(formatUSD(10.5)); // Output: $10.50
