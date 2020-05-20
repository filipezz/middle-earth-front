import React, { useState } from 'react';

import { Link } from 'react-router-dom'
import history from '../../history'
import './styles.css'

function Register() {
  const [state, setState] = useState({
    name:"",
    email: "", 
    password:""
  })

  async function handleLogin(e){
    e.preventDefault()
    await fetch('http://localhost:3333/users',{
      method:'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body:JSON.stringify(state)
    })
    
    history.push('/login')
   }


   function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }
  return  (
    <>
  <form className="card" onSubmit={handleLogin}>
  <h1>Register</h1>
<input name="name" onChange={handleChange} placeholder="Type your name"type="text"/>
<input name="email" onChange={handleChange} placeholder="Type your email"type="text"/>
<input name="password" type="password" onChange={handleChange}placeholder="Type your password"/>
<button type="submit">Register</button>
  <Link to="/">
    <button>Go back</button>
      </Link>  
  </form> 
  </>
  )
}

export default Register;