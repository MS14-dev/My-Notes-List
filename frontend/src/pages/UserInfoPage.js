import React,{useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'

//import components of the page
import Form from '../components/info/Form'

//import common styles
import '../styles/common.css'

export default function UserInfoPage() {

  let navigate = useNavigate();

  //check the authentication of the user before page load
  useEffect(()=>{
    //get the token from local storage
    let token = localStorage.getItem('token')
    if(!token){
        navigate('/')
    }
  },[])

  return (
    <div className='container'>
        <div className='row' >
            <div className='col-md-3' >
              <Link to='/my-account' ><button className='common-blue-btn btn' >My account</button></Link>
            </div>
            <div className='col-md-6' >
                <Form/>
            </div>
            <div className='col-md-3' ></div>
        </div>
    </div>
  )
}
