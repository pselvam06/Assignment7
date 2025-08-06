document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");

    form.addEventListener("submit", function (e) {  
        e.preventDefault(); // Prevent the form from submitting
        const email = document.getElementById("email").value.trim();   
        const password = document.getElementById("password").value.trim();
        

        //regex for email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;


        //regex for password validation
        const passwordPattern = /^[ a-zA-Z0-9!@#$%^&*]{8,}$/;

        let isValid = true;

        // Check if the email is valid      
        if (!emailPattern.test(email)) {
           document.getElementById("emailError").textContent = "Please enter a valid email address.";
              isValid = false;

        }
        
        else {
            document.getElementById("emailError").textContent = ""; // Clear the error message
        }   
         
        if (!passwordPattern.test(password)) {
            document.getElementById("passwordError").textContent = "Password must be at least 8 characters long and can include letters, numbers, and special characters.";
            isValid = false;
        } 
        
        else {
            document.getElementById("passwordError").textContent = ""; // Clear the error message
        }

        if (isValid) {
            console.log({ email, password}); // Log the email and password to the console
            // If both email and password are valid, you can proceed with form submission or further processing
            document.getElementById("loginOutput").textContent =`Login successful! Welcome ${email}`;
          form.reset(); // Reset the form
        }

    });

});
