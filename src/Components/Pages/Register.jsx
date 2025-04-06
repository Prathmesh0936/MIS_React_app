import React, { useState } from 'react'

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';
import axios from 'axios';

export default function Register() {

 
    const [register, setRegister] = useState({
      full_name: "",
      email: "",
      password_hash: "",
    });
  
    const handleChange = (e) => {
      setRegister({
        ...register,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(register);

      try{
        const response = await axios.post('https://mis-production-2e14.up.railway.app/api/auth/register', register);
        console.log(response.data);
        alert("User addes successfully");
      } catch (error){
        console.log(error);
      }
    };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
       <MDBContainer fluid className='p-4'>

<MDBRow>

  <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
      The best offer <br />
      <span className="text-primary">for your business</span>
    </h1>

    <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
     
    </p>

  </MDBCol>

  <MDBCol md='6'>

    <MDBCard className='my-5'>
      <MDBCardBody className='p-5'>

        <MDBRow>
          <MDBInput wrapperClass='mb-4' placeholder='FullName' id='form1' name="full_name" value={register.full_name} onChange={handleChange}/>
        </MDBRow>

        <MDBInput wrapperClass='mb-4' placeholder='Email' id='form1' type='email' name="email" value={register.email} onChange={handleChange}/>
        <MDBInput wrapperClass='mb-4' placeholder='Password' id='form1' type='password' name="password_hash" value={register.password_hash} onChange={handleChange}/>

        <MDBBtn className='w-100 mb-4' size='md'>Register</MDBBtn>

        <div className="text-center">

          <p>Already Hava A Account? <a href="/">Login</a></p>


        </div>

      </MDBCardBody>
    </MDBCard>

  </MDBCol>

</MDBRow>

</MDBContainer>
      </form>
    </div>
  )
}
