import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

//import styles for home/loginForm
import '../../styles/home/loginform.css'
//import common styles
import '../../styles/common.css'


export default function () {

//response message state and user input states
let [responseMessage,setResponseMessage] = useState('');
let [userEmail,setUserEmail] = useState('');
let [userPassword,setUserPassword] = useState('');

//navigation function
const navigate = useNavigate();

//login form submission handle function
const onFormSubmit=async(e)=>{
    try{
      e.preventDefault();
      let {data} = await axios.post('http://localhost:8000/student/login',{userEmail,userPassword});
      if(!data.response){
        setResponseMessage(data.message);
      }else{
        //when sucessfully logged
        let token = data.token;
        //save token in local storage
        localStorage.setItem('token',token);
        //when first time
        if(data.firstTime){
          navigate('/student-info');
        }else{
          navigate('/my-account')
        }
      }
    }catch(err){
      throw err;
    }
}

  return (
    <div className='container-fluid'>
        <div className='row' > 
           <div className='col-md-3' ></div>
           <div className="form-group col-md-6 home-login-form-outer-div">
             <form onSubmit={onFormSubmit}>
               <p className='home-login-form-response-message'>{responseMessage}</p>
               <input 
                type="email" 
                className="form-control common-input" 
                placeholder="Enter email"
                required
                onChange={(e)=>{setUserEmail(e.target.value)}}
               />
               <input 
                type="password" 
                className="form-control common-input" 
                placeholder="Enter password"
                required
                onChange={(e)=>{setUserPassword(e.target.value)}}
               />
               <button className='common-yellow-btn btn' type='submit'>login</button>
               <p><Link to='/signin' >Signin here</Link></p>
             </form>
           </div>
           <div className='col-md-3' ></div>
        </div>
    </div>
  )
}
