//Home page component
import React from 'react'

//import components of home page
import LoginForm from '../components/home/LoginForm'
import Carousel from '../components/home/Carousel'

export default function HomePage() {
  return (
    <div className='container-fluid'>
        <div className='row' >
            <div className='col-md-6' >
              <Carousel/>
            </div>
            <div className='col-md-6' >
              <LoginForm/>
            </div>
        </div>
    </div>
  )
}
