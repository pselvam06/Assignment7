let n = 5; 
  // Upper half of the diamond
  for (let i = 1; i <= n; i++) {
    let row = '';
    // Spaces
    for (let j = n; j > i; j--) {
      row += ' ';
    }
    // Stars
    for (let k = 1; k <= 2 * i - 1; k++) {
      row += '*';
    }
    console.log(row);
  }

  // Lower half of the diamond
  for (let i = n - 1; i >= 1; i--) {
    let row = '';
    // Spaces
    for (let j = n; j > i; j--) {
      row += ' ';
    }
    // Stars
    for (let k = 1; k <= 2 * i - 1; k++) {
      row += '*';
    }
    console.log(row);
  }
