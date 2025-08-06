import React from 'react'
import Dashboard from './Dashboard'

function Login() {

    const Username = "Selvam Palanisamy";
    const Role = "Admin";
    const Message = (Username)=> {
        alert("Login Successful in " + Username);
    }
  return (
    <div>
      <form action="">
        <input type="text" placeholder="Username" /> <br />
        <input type="password" placeholder="Password" /> <br /> 
        <button type="submit">Login</button>
        <button type="reset">Reset</button>
        <button type="button">Cancel</button>
        </form>
        <Dashboard 
        username={Username}
         userRole={Role}
            Message={Message}
         />
    </div>
  )
}

export default Login
