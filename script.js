function printDiamond() {
  const rows = parseInt(document.getElementById("rows").value);
  let output = "";

  // Upper part
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= rows - i; j++) {
      output += " ";
    }
    for (let k = 1; k <= 2 * i - 1; k++) {
      output += "*";
    }
    output += "\n";
  }

  // Lower part
  for (let i = rows - 1; i >= 1; i--) {
    for (let j = 1; j <= rows - i; j++) {
      output += " ";
    }
    for (let k = 1; k <= 2 * i - 1; k++) {
      output += "*";
    }
    output += "\n";
  }

  document.getElementById("output").textContent = output;
}