import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

//import common styles
import '../styles/common.css'

//import page components
import Note from '../components/student/Note';

export default function StudentPage() {
    //initiate navigation hook
    let navigate = useNavigate();

    //set initial state of notes
    let [notes,setNotes] = useState([]);

  useEffect(()=>{
      try{
          const fetchData=async()=>{
            //get user's token
            let token = localStorage.getItem('token');
            if(token){
                let {data} = await axios.get('http://localhost:8000/student/all-notes',{
                    headers:{
                        access_token:token
                    }
                })
                //check the authentication of the user
                if(data.response){
                    //set received notes to the notes state
                    setNotes(data.notes);
                }else{
                    //authentication failed
                    navigate('/')
                }
            }else{
                //authentication failed
                navigate('/')
            }
        }
        fetchData();
    }
    catch(err){
        throw err;
    }
  },[])

  return (
    <div  className='container-fluid'>
        <div className='row' >
            <div className='col-md-6' >
                <h1 className='common-yellow-text' >My notes</h1>
                {
                    notes.length != 0 ?
                    notes.map((note)=>{
                        return(
                            <Note key={note._id} noteId={note._id} noteTitle={note.title} />
                        )
                    })
                    :
                    <h6 className='common-blue-text' >No notes yet</h6>
                }
            </div>
            <div className='col-md-6'>
                <div className='row'>
                    <div>
                        <Link to='/new-note' ><button className='common-blue-btn btn'>New Note</button></Link>
                    </div>
                    <div>
                        <Link to='/student-info' ><button className='common-yellow-btn btn'>Edit my info</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
