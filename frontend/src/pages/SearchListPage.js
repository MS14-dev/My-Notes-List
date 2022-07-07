import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useNavigate ,useLocation} from 'react-router-dom';

//import page components
import StudentList from '../components/admin/StudentList'
import StudentDetail from '../components/admin/StudentDetail';

export default function SearchListPage() {

    
    //set the navigation hook
    let navigate = useNavigate();

    //set the initial state of students details
    let [studenstList,setStudentsList] = useState([]);

    //initial state of paricular user details
    let [studentInfo,setStudentInfo] = useState(false);

    //initiate location hook for get data from route
    let location = useLocation()
    
    //check the validation and data when page load
    useEffect(()=>{
        //create function for fetch data
        const fetchData=async()=>{
            //get the stored token
            let token = localStorage.getItem('token');
            if(token){
                //get data from location hook
                let searchResult = location.state.searchResult;
                if(searchResult.length != 0){
                    setStudentsList(searchResult);
                }else{
                    navigate('admin/dashboard')
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
                {/* send setStudentInfo prop to set info of a student to state */}
                <StudentList studentsList={studenstList} setStudentInfo={setStudentInfo}/>
            </div>
            <div className='col-md-6' >
                {studentInfo ? 
                   <StudentDetail studentInfo={studentInfo}/> : 
                   <p className='common-yellow-text' >Please select a student</p>
                }
            </div>
        </div>
    </div>

  )
}
