let a = 18;
let b = 18;
function add(a, b) {    
 console.log(a + b);
}

add(a, b); // 36

function message() {
   return "Hello World!";
}

console.log(message()); // Hello World!


function firstFunction() {
    console.log("This is the first function.");
}

function secondFunction() {
    firstFunction()
}

secondFunction(); // This is the first function.

function basicFunction() {
   function advancedFunction() {
      return "This is an advanced function.";
   }

   function masterFunction() {
      return "This is a master function.";
   }
console.log(advancedFunction()); // This is an advanced function.
console.log(masterFunction()); // This is a master function.
   return "This is a basic function.";
}


console.log(basicFunction()); // This is a basic function.