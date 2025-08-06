import React from 'react'
import "./Hero.css";

function Hero() {
  return (
    <section id='home'className='hero d-flex align-items-center justify-content-center text-dark'>
      <div className="hero-content">
        <h1 className='hero-title display-4 font-weight-bold'>Welcome to Our Website</h1>
        <p className='hero-description lead '>Discover amazing products and services tailored just for you.</p>
        <button className='hero-button btn btn-primary'>Get Started</button>
      </div>

    </section>
  )
}

export default Hero
