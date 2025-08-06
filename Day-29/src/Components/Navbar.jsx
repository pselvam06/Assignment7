import React from 'react';
import './Navbar.css'; // Assuming you have a CSS file for styling
// Compare this snippet from Day-29/src/Components/Navbar.css:

function Navbar() {
  return (
    <div class="navbar-container">
        <div> <h3>My Portfolio</h3>
        </div>
       <div>
       <ul>
        <li>Home</li>
        <li>Contact</li>
        <li>Profile</li>
       </ul>
        </div> 
       
    </div>
  )
}

export default Navbar
