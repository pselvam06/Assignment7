let countA = 0;
let countB = 0;
let total = 0;


function addToCart(product) {
    if (product === 'A') {
        countA += 1;
        total += 10;

        document.getElementById("itemA").textContent ="Product A:" + countA;
    }

    else if (product === 'B') { 
        countB += 1;
        total += 15;

        document.getElementById("itemB").textContent ="Product B:" + countB;
    } 
    
    else {    
        windows.alert("Product not found"); 
    }   
    
    document.getElementById("totalPrice").textContent =  total;
    
}