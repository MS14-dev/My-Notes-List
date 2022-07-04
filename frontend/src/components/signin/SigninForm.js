import React,{useState} from 'react';
import axios from 'axios';

//import signin form styles signin/signinform
import '../../styles/signin/signinform.css';

//import common styles
import '../../styles/common.css';


export default function SigninForm() {
  
  //state initiate for view the error message if any
  let [responseMessage,setResponseMessage] = useState('')
  //state initiate for email 
  let [userEmail,setUserEmail] = useState('');
  
  //function for handle the signin form submission
  const handleSubmit = async(e)=>{
    try{
      e.preventDefault();
      //send and revieve validity of the email
      let {data} = await axios.post('http://localhost:8000/student/signin',{userEmail})
      //set the message according to the backend response
      setResponseMessage(data.message)

    }catch(err){
      console.log(err)
      throw err
    }
  }


  return (
    <div className='container-fluid'>
        <div className='row' >
           <h1 className='common-blue-text'>My Notes List</h1>
           <p className='common-yellow-text' >Sign in</p>
           <div className="form-group signin-signin-form-outer-div">
             <form onSubmit={handleSubmit}>
               <p className='signin-signin-form-response-message'>{responseMessage}</p>
               <input 
                 type="email" 
                 className="form-control common-input" 
                 required 
                 placeholder="Enter email"
                 onChange={(e)=>{setUserEmail(e.target.value)}}
               />
               <button type='submit' className='common-blue-btn btn'>Sign in</button>
             </form>
           </div>
        </div>
    </div>
  )
}
