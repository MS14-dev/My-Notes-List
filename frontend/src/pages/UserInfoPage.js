import React,{useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

//import components of the page
import Form from '../components/info/Form'

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
            <div className='col-md-3' ></div>
            <div className='col-md-6' >
                <Form/>
            </div>
            <div className='col-md-3' ></div>
        </div>
    </div>
  )
}
