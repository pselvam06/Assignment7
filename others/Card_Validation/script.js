document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cardForm");

    form.addEventListener("submit", function (e) {  
        e.preventDefault(); // Prevent the form from submitting
        const cardNumber = document.getElementById("cardNumber").value.trim();   
        const expiryDate = document.getElementById("expiryDate").value.trim();
        const cvv = document.getElementById("cvv").value.trim();
        const cardHolderName = document.getElementById("name").value.trim();
        

        //regex for email validation
        const cardNumberPattern = /^\d{16}$/ ;
        //regex for password validation
        const expiryDatePattern = /^0[1-9]|1[0-2]\/[0-9]{2}$/;
        const cvvPattern = /^\d{3}$/;
        const cardHolderNamePattern = /^[a-zA-Z]$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        let isValid = true;

        // Check if the email is valid      
        if (!cardNumberPattern.test(cardNumber)) {
           document.getElementById("cardError").textContent = "Please enter a valid card number.";
              isValid = false;

        }
        
        else {
            document.getElementById("cardError").textContent = ""; // Clear the error message
        }   
         
        if (!expiryDatePattern.test(expiryDatePattern)) {
            document.getElementById("expiryError").textContent = "Expiry date must be in MM/YY format.";
            isValid = false;
        } 
        
        else {
            document.getElementById("expiryError").textContent = ""; // Clear the error message
        }
        
        if (!cvvPattern.test(cvv)) {
            document.getElementById("cvvError").textContent = "CVV must be 3 digits.";
            isValid = false;
        } 
        
        else {
            document.getElementById("cvvError").textContent = ""; // Clear the error message
        }

        if (!cardHolderNamePattern.test(cardHolderName)) {
            document.getElementById("nameError").textContent = "Cardholder name must contain only letters and spaces.";
            isValid = false;
        }
        else {
            document.getElementById("nameError").textContent = ""; // Clear the error message
        }

        if (!emailPattern.test(email)) {
            document.getElementById("emailError").textContent = "Please enter a valid email address.";
            isValid = false;
        }   
        else {
            document.getElementById("emailError").textContent = ""; // Clear the error message
        }

        if (isValid) {
            console.log({ cardNumber,cvv,expiryDate,cardHolderName}); // Log the email and password to the console
            // If both email and password are valid, you can proceed with form submission or further processing
            document.getElementById("CardValidation").textContent =`Card Validated for ${email}`;
          form.reset(); // Reset the form
        }

    });

});
