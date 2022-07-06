import React from 'react'

//import common style
import '../../styles/common.css'
import '../../styles/admin/studentList.css'

export default function StudentList({studentsList}) {
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
                            <div key={student._id} className='admin-student-list-list-item-outer'>
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
