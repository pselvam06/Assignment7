let a = 19;
if (a >= 18) {
    console.log("voter id applicable");
}     

else if (a < 18) {
    console.log("Voter id not applicable");        
}

// }//Arrow function


a= 35;
if (a >= 50 && a <= 60) {
    console.log("C Grade");
}
else if (a >60 && a <= 70) {
    console.log("B Grade");      
         
}   
else if (a > 70 && a <= 80) {
    console.log("A Grade"); 
}       

else if (a > 80 && a <= 90) {   
    console.log("A+ Grade"); 
}       

else if (a > 90 && a <= 100) {
    console.log("A++ Grade"); 
}
else {
    console.log("FAIL"); 
}   

var total = 60;

if (total >= 50){

 if (total >= 300) {
    console.log("A Grade"); 
 }
    else if (total >= 200) {
        console.log("B Grade"); 
    }   
    else if (total >= 100) {
        console.log("C Grade"); 
    }
    else if (total >= 50) {
        console.log("D Grade"); 
    }
  
}
else {
    console.log("FAIL"); 
}


let day = "tuesday";

if(day === "tuesday") {
    console.log("Today is wednesday");
}   

else  {
    console.log("Today is not wednesday");
}


switch (day) {
    case "monday":  
    console.log("Today is Monday");
    break;
    case "tuesday":
    console.log("Today is Tuesday");
    break;
    case "wednesday":
    console.log("Today is Wednesday");
    break;

    default:    
    console.log("Today is  restday");
}

