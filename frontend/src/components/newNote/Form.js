import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//import components styles
import '../../styles/newNote/form.css'
//import common styles
import '../../styles/common.css'

export default function () {

    //define input feild default state 
    let [title,setTitle] = useState(''); 
    let [description,setDescription] = useState(''); 

    //navigate hook define
    let navigate = useNavigate();

    //form submission function
    const onSubmit=async(e)=>{
        e.preventDefault();
        //get the user token
        let token = localStorage.getItem('token')
        if(title || description){
            //send the data with access token to the backend
            let {data} = await axios.post('http://localhost:8000/student/add-new-note',{
                title,
                description
            },
            {headers:{access_token:token}}
            )
            if(data.response){
                //navigate to student account
                navigate('/my-account')
            }
        }
    }

  return (
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-12' >
               <form onSubmit={onSubmit}>
                    <h3 className='common-yellow-text' >Add new note</h3>
                    <input 
                      type="text" 
                      className="form-control common-input" 
                      required 
                      placeholder="Note title"
                      onChange={(e)=>{setTitle(e.target.value)}}
                    />
                    <textarea
                     type="text" 
                     className="form-control common-input" 
                     required 
                     placeholder="Description"
                     rows='15'
                     onChange={(e)=>{setDescription(e.target.value)}}
                    />
                    <button className='btn common-blue-btn' >Add</button>
               </form>
            </div>
        </div>
    </div>
  )
}
