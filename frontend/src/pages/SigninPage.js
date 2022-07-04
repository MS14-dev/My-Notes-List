import React from 'react'

//import signin page components
import SigninForm from '../components/signin/SigninForm'



export default function SigninPage() {
  return (
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-4' ></div>
            <div className='col-md-4' >
                <SigninForm/>
            </div>
            <div className='col-md-4' ></div>
        </div>
    </div>
  )
}
