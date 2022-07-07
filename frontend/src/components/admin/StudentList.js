import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

//import common style
import '../../styles/common.css'
import '../../styles/admin/studentList.css'

export default function StudentList({studentsList,setStudentInfo}) {

    //set the initial state of search text
    let [searchText,setSearchText] = useState('')

    //initiate the navigate hook
    let navigate = useNavigate();

    const onSearch=async(e)=>{
        try{
            //get the user token
            if(e.key == 'Enter'){
                let token = localStorage.getItem('token')
                let {data} = await axios.post('http://localhost:8000/admin/user-details',{
                    searchText
                },{
                    headers:{
                        admin_access_token:token
                    }
                })
                if(data.response){
                    //move to the search page with search results
                    navigate('/admin/search',{state:{searchResult:data.searchResult}})
                }
            }
        }catch(err){
            throw err
        }
    }

  return (
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-12' >
                <p className='admin-student-list-list-title common-yellow-text' >List of users</p>
                <input 
                   className="form-control common-input"  
                   placeholder='search studnets name,email or id'
                   onKeyDown={onSearch}
                   onChange={(e)=>{setSearchText(e.target.value)}}
                />
            </div>
            <div className='col-md-12 admin-student-list-inner' >
                {
                    studentsList.map((student)=>{
                        return(
                            <div 
                            //   change the student info state in the higher order componet
                              onClick={()=>{setStudentInfo(student)}} 
                              key={student._id} 
                              className='admin-student-list-list-item-outer'
                              >
                                <p>{`${student.firstName} ${student.lastName}`}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}
