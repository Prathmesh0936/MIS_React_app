import React, { useState } from 'react'
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import axios from 'axios';

export default function Login() {

  const [password_hash, setPasswordValue] = useState('');
  const [email, setEmailValue] = useState('');

  const setPassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const setEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password_hash);

    const data = {
      email: email,
      password_hash: password_hash
    };

    try{
      const response = await axios.post('https://mis-production-2e14.up.railway.app/api/auth/login', data);
      console.log(response.data);
      if(response.date){
        alert("Invalid credentials");
      }else { 
        alert("Login successful");
      }
    } catch (error){
      console.log(error);
    }

  };
  return (

    <form onSubmit={handleSubmit}>
    <MDBContainer fluid className="p-3 my-5">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6'>


          <MDBInput wrapperClass='mb-4' id='formControlLg' type='email' size="lg" placeholder='Email address' value={email} onChange={setEmail}/>
          <MDBInput wrapperClass='mb-4' id='formControlLg' type='password' size="lg" placeholder='Password' value={password_hash} onChange={setPassword}/>


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg">Login  </MDBBtn>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">don't hava an account <a href="Register">Register</a></p>
          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </form>
  );
}
