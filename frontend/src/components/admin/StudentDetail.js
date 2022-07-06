import React from 'react'

export default function StudentDetail({studentInfo}) {
  return (
    <div className='container-fluid' >
        <div className='row' >
            <div className='col-md-12' >
                <h1>Details</h1>
                <p>{`Full Name: ${studentInfo.firstName} ${studentInfo.lastName}`}</p>
                <p>{`DOB: ${studentInfo.dateOfBirth}`}</p>
                <p>{`Email: ${studentInfo.email}`}</p>
                <p>{`Phone: ${studentInfo.mobile}`}</p>
            </div>
        </div>
    </div>
  )
}
