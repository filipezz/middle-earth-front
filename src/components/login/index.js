import React, { useState } from 'react';
import {Link } from 'react-router-dom'

import deleteIcon from './delete.png'
import editIcon from './edit.png'

import './styles.css'

function Login() {
  const [state, setState] = useState({
    
    email: "", 
    password:""
  })
  const [places, setPlaces] = useState([])

  const [loading, setLoading]= useState(true)
  const [signed, setSigned]= useState(false)
  const [token, setToken]= useState()
  

  async function loadPlaces(pass){
    setLoading(true)
    const response = await fetch('http://localhost:3333/places',{
      headers:new Headers({
        'authorization': `Bearer ${pass}` 
        
      }), 
      
    })
    
    const data = await response.json()
    if(response.status===200){
      setPlaces(data) 
      setLoading(false)
      return
    }
    setPlaces([])
    setLoading(false)
    return
  }

  async function handleLogin(e){
   e.preventDefault()
  const response = await fetch('http://localhost:3333/sessions',{
     method:'POST',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(state)
   })
   const data = await response.json()
   if (response.status===200){
     setToken(data.token)
     
    setLoginInTheRightOrder(data.token)
    
       

     
   }
  }
  function setLoginInTheRightOrder(pass){
   setTimeout(()=>{
    loadPlaces(pass) 
   }, 500) 
    setSigned(true)
  }
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }
 async function handleDelete(place_id){
   const confirm = window.confirm('Are you sure you want to delelete this place?')
   if(confirm){
     await fetch(`http://localhost:3333/places/${place_id}`,{
      method:'DELETE',
      headers:new Headers({
        'authorization': `Bearer ${token}` 
        
      }), 
      
    })
    loadPlaces(token)
    return
   }
   return
 }
 console.log(places)
  return( 
    
  < >
    {signed ?
    <>
    <header>

   <Link className="header" to="/">
   Browse places
   </Link> 
   <Link className="header"  to={`/add/${token}`}>
Add place
</Link>
    </header>
{loading ? 
<h1>Loading...</h1>
:
<>
{places.length===0? <h1>No places registered yet</h1> : 

<div className="content">


 {places?.map((place)=>(
  <div className="place-container" key={place.id}>
    <img src={place.image_url} alt=""/>
    <div className="text">
    
  <div>

    <strong>{place.name}</strong>
   <Link to={`/edit/${token}/${place.id}`}>
   <img src={editIcon}  className="icon" alt=""/>
   </Link> 
    <img src={deleteIcon} onClick={()=> handleDelete(place.id)} className="icon" alt=""/>
  </div>

  </div>
</div>
))} 
</div>
}
</>
}
</>
    : 
    <>  
      <form className="card" onSubmit={handleLogin}>
      <h1>Login</h1>
    <input name="email" onChange={handleChange} placeholder="Type your email"type="text"/>
    <input name="password" type="password" onChange={handleChange}placeholder="Type your password"/>
    <button type="submit">Login</button>
    <Link to="/">
    <button>Go back</button>
      </Link>  
      </form> 
      </> }
     

    
  </>
)
}
export default Login;