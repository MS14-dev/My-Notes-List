import React from 'react'

//import style sheet home/carousel
import '../../styles/home/carousel.css'
//import common styles
import '../../styles/common.css'

export default function Carousel() {
  return (
    <div className='container-fluid' >
        <div className='row' >
          <div className='home-carousel-outer-div'>
            <h1 className='common-blue-text'>My Notes List</h1>
            <p className='common-yellow-text'>
               We help you to manage all your notes better way as you desire...!! 
            </p>
          </div>
        </div>
    </div>
  )
}
