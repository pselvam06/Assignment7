import React from 'react'

import Home from './Components/Home'

function App() {
 const role = "admin";
  return (
    <div>
      <h1>MY Application</h1>
        <Home userRole={role} />
    </div>
  )
}

export default App
