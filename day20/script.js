//Arrow function
const getInput = () => {
 console.log("java script");
   
}

getInput();


function greetuser(name,callback,callback1) {
    console.log("Hello " + name);
    callback();
    callback1();
}

function greetmessage() {
    console.log("Welcome to the world of JavaScript!");

}

function greetmessag1() {
    console.log("Welcome to the world of JavaScript! 1");

}
greetuser("John", greetmessage,greetmessag1);
//Arrow function



function greetuser(name,callback,callback1) {
    console.log("Hello " + name);
    callback();
    callback1();
}

function greetmessage() {
    console.log("Welcome to the world of JavaScript!");

}

function greetmessag1() {
    console.log("Welcome to the world of JavaScript! 1");

}
greetuser("John", greetmessage,greetmessag1);
//Arrow function


function outerFunction() {
    console.log("Outer function called");

    function innerFunction() {
        console.log("Inner function called");
    }
    innerFunction();
}

outerFunction();
//Arrow function        

function multiply(a) {
   return function (b) {
    return a * b;
}
}
const multiplyByTwo = multiply(2);
console.log(multiplyByTwo(5)); // Output: 15      