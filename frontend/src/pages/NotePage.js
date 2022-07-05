import React,{useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

//import common styles
import '../styles/common.css'

export default function NotePage() {
//hook for catch the params come from the dynamic route
    let params = useParams()

    let navigate = useNavigate();

    //set initial state for note title and description
    let [title,setTitle] = useState('')
    let [description,setDescription] = useState('')
    //set param's id to id state
    let [id,setId] = useState(params.id)
 
    //set the page details when it load
    useEffect(()=>{
        //function for gather data from backend
        try{
            const fetchData=async()=>{
                //get the noteId from params
                let noteId = params.id
                //get the user token
                let token = localStorage.getItem('token')
                let {data} = await axios.get(`http://localhost:8000/student/note/${noteId}`,{
                    headers:{
                        access_token:token
                    }
                })
                if(data.response){
                    //get note details
                    setTitle(data.noteDetails.title)
                    setDescription(data.noteDetails.description)
                }else{
                    //when authentication failed
                    navigate('/')
                }
            }
            fetchData();
        }catch(err){
            navigate('/')
            throw err;
        }
    },[])

    //form submission handle function
    const onSubmit=async(e)=>{
        try{
            e.preventDefault();
            //get the user token
            let token = localStorage.getItem('token')
            let {data} = await axios.post('http://localhost:8000/student/update-note',{
                id,
                title,
                description
            },{
                headers:{
                    access_token:token
                }
            }
            )
            //navigate to account page
            if(data.response){
                alert(data.message);
                navigate('/my-account');
            }else{
                alert(data.message)
                navigate('/my-account');
            }
        }catch(err){
            console.log(err)
            throw err;
        }
    }

  return (
    <div className='container-fluid'>
        <div className='row' >
            <div className='col-md-3' ></div>
            <div className='col-md-6' >
                <form onSubmit={onSubmit}>
                    <input 
                      type="text" 
                      className="form-control common-input" 
                      placeholder="Title"
                      required
                      value={title}
                      onChange={(e)=>{setTitle(e.target.value)}}
                    />
                    <textarea
                      type="text" 
                      className="form-control common-input" 
                      required 
                      placeholder="Description"
                      rows='15'
                      value={description}
                      onChange={(e)=>{setDescription(e.target.value)}}
                    />
                    <button type='submit' className='btn common-yellow-btn' >Update</button>
                </form>
            </div>
            <div className='col-md-3' ></div>
        </div>
    </div>
  )
}
