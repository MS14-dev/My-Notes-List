import React from 'react'

//import signin form styles signin/signinform
import '../../styles/signin/signinform.css'

//import common styles
import '../../styles/common.css'

export default function SigninForm() {
  return (
    <div className='container-fluid'>
        <div className='row' >
           <h1 className='common-blue-text'>My Notes List</h1>
           <p className='common-yellow-text' >Sign in</p>
           <div class="form-group signin-signin-form-outer-div">
               <input type="email" class="form-control common-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
               <button className='common-blue-btn btn'>Sign in</button>
           </div>
        </div>
    </div>
  )
}
