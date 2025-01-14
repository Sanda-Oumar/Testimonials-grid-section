const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = ""; // Valeur actuellement saisie
let previousInput = ""; // Valeur précédemment saisie
let operator = null; // Opérateur en cours

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Si c'est un chiffre ou un point
    if (!isNaN(value) || value === ".") {
      currentInput += value;
      updateDisplay(currentInput);
    }
    // Si c'est un opérateur
    else if (value === "+" || value === "-" || value === "x" || value === "/") {
      if (currentInput === "") return; // Empêche l'utilisation d'un opérateur sans chiffre
      operator = value === "x" ? "*" : value; // Remplace x par *
      previousInput = currentInput;
      currentInput = "";
    }
    // Si c'est =
    else if (value === "=") {
      if (previousInput && currentInput && operator) {
        const result = calculate(previousInput, currentInput, operator);
        updateDisplay(result);
        currentInput = result; // Permet un calcul continu
        previousInput = "";
        operator = null;
      }
    }
    // Supprimer le dernier caractère
    else if (value === "DEL") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || "0");
    }
    // Réinitialiser
    else if (value === "RESET") {
      currentInput = "";
      previousInput = "";
      operator = null;
      updateDisplay("0");
    }
  });
});

// Met à jour l'affichage
function updateDisplay(value) {
  display.textContent = value;
}

// Effectue le calcul
function calculate(num1, num2, operator) {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  switch (operator) {
    case "+":
      return (n1 + n2).toString();
    case "-":
      return (n1 - n2).toString();
    case "*":
      return (n1 * n2).toString();
    case "/":
      return n2 !== 0 ? (n1 / n2).toString() : "Error"; // Gérer la division par 0
    default:
      return "Error";
  }
}
