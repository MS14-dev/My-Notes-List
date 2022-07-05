import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

//import common styles
import '../../styles/common.css'
//import form styles
import '../../styles/info/form.css'

export default function Form() {

  //set default states for form feild values
  let [firstName,setFirstName] = useState('')
  let [lastName,setLastName] = useState('')
  let [mobile,setMobile] = useState('')
  let [dateOfBirth,setDateOfBirth] = useState('')
  let [password,setPassword] = useState('')

  //navigation hook
  let navigate = useNavigate()

  //form submit handle function
  const onSubmitForm=async(e)=>{
    try{
        e.preventDefault();
        //get the token form local storage
        let token = localStorage.getItem('token')
        //check whether all the fields are filled
        if(firstName || lastName || mobile || dateOfBirth || password){
            let {data} = await axios.post('http://localhost:8000/student/info-update',{
                firstName,
                lastName,
                mobile,
                password,
                dateOfBirth
            },{headers:{access_token:token}})
            if(data.response){
                navigate('/');
            }
        }
    }catch(err){
        throw err;
    }
  }

  return (
    <div className='container-fluid'>
        <div className='row' >
            <div className='col-md-12' >
                <p className='common-yellow-text' >Update your info</p>
                <form onSubmit={onSubmitForm} >
                   <input
                    type="text" 
                    className="form-control common-input" 
                    placeholder="First name"
                    required
                     onChange={(e)=>{setFirstName(e.target.value)}}
                   />
                   <input
                    type="text" 
                    className="form-control common-input" 
                    placeholder="Last name"
                    required
                     onChange={(e)=>{setLastName(e.target.value)}}
                   />
                   <label>Date of Birth</label>
                   <input
                    type="date" 
                    className="form-control common-input" 
                    placeholder="Date of birth"
                    required
                     onChange={(e)=>{setDateOfBirth(e.target.value)}}
                   />
                   <input
                    type="number" 
                    className="form-control common-input" 
                    placeholder="Mobile number"
                    required
                     onChange={(e)=>{setMobile(e.target.value)}}
                   />
                   <input
                    type="password" 
                    className="form-control common-input" 
                    placeholder="Enter new password"
                    required
                     onChange={(e)=>{setPassword(e.target.value)}}
                   />
                   <button className='btn common-blue-btn' >Update</button>
                </form>
            </div>
        </div>
    </div>
  )
}
