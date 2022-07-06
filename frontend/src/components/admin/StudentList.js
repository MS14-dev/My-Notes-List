import React from 'react'

//import common style
import '../../styles/common.css'
import '../../styles/admin/studentList.css'

export default function StudentList({studentsList,setStudentInfo}) {
  return (
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-12' >
                <p className='admin-student-list-list-title common-yellow-text' >List of users</p>
            </div>
            <div className='col-md-12' >
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
