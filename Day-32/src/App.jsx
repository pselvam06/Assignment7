import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Products from './Components/Products'


function App() {
  
  return (
   <div> 
    <Navbar/>
    <Hero/>   
    <Products/>
   </div>
  )
}

export default App
