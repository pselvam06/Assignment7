import React from 'react'
import './Login.css'

function Login() {
  return (
    <div>
      <form action=""> 
        <label htmlFor="">Username</label>
        <input type="text" placeholder='Username' /> <br /> <br />
        <label htmlFor="">Password</label>      
        <input type="password" placeholder='Password' /> <br />
        <button type="submit">Login</button>
       
      </form>
    </div>
  )
}

export default Login
