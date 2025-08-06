import React from 'react'

import Feed from './Components/Feed'
import Profile from './Components/Profile'
import Jobs from './Components/Jobs'


function App() { 
  return (
    <div>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>

    </div>
  )
}

export default App
