import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

//import common styles
import '../styles/common.css'

export default function AdminLoginPage() {

    //set initial state for email,password and response message
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')
    let [responseMessage,setResponseMessage] = useState('')

    //define the navigate hook
    let navigate = useNavigate();

    //form submit handle function
    const onFormSubmit=async(e)=>{
        try{
            e.preventDefault();
            let {data} = await axios.post('http://localhost:8000/admin/login',{
                email,
                password
            })
            if(data.response){
                //when authenticated
                //need to be set to admon dashboard !!!!!
                let token = data.token
                //store the token in localStorage
                localStorage.setItem('token',token)
                navigate('/admin/dashboard')
            }else{
                setResponseMessage(data.message)
            }
        }catch(err){
            throw err;
        }
    }

  return (
    <div className='container-fluid'>
        <div className='row' >
            <div className='col-md-4' ></div>
            <div className='col-md-4' >
                <form onSubmit={onFormSubmit} >
                    <p className='common-blue-text' >Admin</p>
                    <p className='common-yellow-text' >{responseMessage}</p>
                    <input 
                      type="email" 
                      className="form-control common-input" 
                      required 
                      placeholder="Enter email"
                      onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <input 
                      type="password" 
                      className="form-control common-input" 
                      required 
                      placeholder="Enter password"
                      onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <button className='btn common-yellow-btn' >Login</button>
                </form>
            </div>
            <div className='col-md-4' ></div>
        </div>
    </div>
  )
}
