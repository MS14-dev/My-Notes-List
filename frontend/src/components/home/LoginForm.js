import React from 'react'
import {Link} from 'react-router-dom'

//import styles for home/loginForm
import '../../styles/home/loginform.css'
//import common styles
import '../../styles/common.css'


export default function () {
  return (
    <div className='container-fluid'>
        <div className='row' > 
           <div className='col-md-3' ></div>
           <div className="form-group col-md-6 home-login-form-outer-div">
               <input type="email" className="form-control common-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
               <input type="password" className="form-control common-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter password"/>
               <button className='common-yellow-btn btn'>login</button>
               <p>signin here</p>
           </div>
           <div className='col-md-3' ></div>
        </div>
    </div>
  )
}
