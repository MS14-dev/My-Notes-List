import React from 'react'
import { useNavigate } from 'react-router-dom'

//import style sheet
import '../../styles/student/note.css'
//import common style sheet
import '../../styles/common.css'
import axios from 'axios';

//noteId and noteTitle came through the Student Page
export default function Note({noteId,noteTitle}) {

    let navigate = useNavigate();

    //function for get note description
    const onClickTitle=(noteId)=>{
        navigate(`/note/${noteId}`)
    }
    //function for note delete
    const onDelete=async(noteId)=>{
        try{ 
            //get the user's token
            let token = localStorage.getItem('token')
            let {data} = await axios.get(`http://localhost:8000/student/delete-note/${noteId}`,{
                headers:{
                    access_token:token
                }
            });
            if(data.response){
                //when deletion success
                alert(data.message)
                navigate('/my-account');
            }else{
                alert(data.message);
            }
        }catch(err){
            throw err;
        }
    }

  return (
    <div className='container-fluid student-note-outer-div'>
        <h3 className='common-yellow-text'>{noteTitle}</h3>
        <button onClick={()=>{onDelete(noteId)}} className='btn btn-xs btn-danger' >Delete</button>
        <button onClick={()=>{onClickTitle(noteId)}} className='btn btn-xs btn-primary' >View</button>
    </div>
  )
}
