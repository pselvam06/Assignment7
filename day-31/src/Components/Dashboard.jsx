import React from 'react'

function Dashboard({username,userRole, Message}) {
  return (
    <div>
      {userRole === 'admin' ? (

        <h1>Welcome {username} to the Dashboard! You are logged in as {userRole}.</h1>
      ) :        (
        <div>
            <h1>Welcome Back {username}</h1>
            <h2>Your Role is {userRole}</h2>
            <button onClick={() => Message(username)}>Click Me</button>
        </div> 
        
        
        
        
        
        )}
    </div>
  )
}

export default Dashboard
