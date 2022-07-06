import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//import page components
import StudentList from '../components/admin/StudentList'

//import common style
import '../styles/common.css'

export default function AdminPage() {

    //set the navigation hook
    let navigate = useNavigate();

    //set the initial state of students details
    let [studenstList,setStudentsList] = useState([]);
    
    //check the validation and data when page load
    useEffect(()=>{
        //create function for fetch data
        const fetchData=async()=>{
            //get the stored token
            let token = localStorage.getItem('token');
            if(token){
                //get students details from backend
                let {data} = await axios.get('http://localhost:8000/admin/all-student',{
                    headers:{
                        admin_access_token:token
                    }
                })
                if(data.response){
                    //set studetsList filled with received list from the backend
                    setStudentsList(data.studentsList)
                }else{
                    //authentication failed
                    // alert(data.message)
                    navigate('/admin/login')
                }
            }else{
                //admin is not logged or token erased
                navigate('/admin/login')
            }
        }
        fetchData();
    },[])
    return (
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-12' >
                <p className='common-yellow-text' >My Notes List</p>
                <p className='common-blue-text' >Admin Dashboard</p>
            </div>
            <div className='col-md-6' >
                <StudentList studentsList={studenstList} />
            </div>
            <div className='col-md-6' ></div>
        </div>
    </div>
  )
}
