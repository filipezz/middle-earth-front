import React, { useState } from 'react';
import {Link } from 'react-router-dom'
import history from '../../history'
 import  './styles.css';

function AddPlace({match}) {
  const [image, setImage]= useState()
  const [name, setName]= useState()
  
 async function handleImagePost(e){
    const data = new FormData()
   
 data.append('file', e.target.files[0])
    const file = await fetch('http://localhost:3333/files', {
     method: "POST",
     headers:new Headers({
      'authorization': `Bearer ${match.params.user}` 
      
    }), 
     body: data
   }) 
  const response = await file.json()
  setImage(response.id)
  }
  
  async function handleSubmit(e){
    e.preventDefault()
  await fetch('http://localhost:3333/places', {
    method: "POST",
    headers:new Headers({
     'authorization': `Bearer ${match.params.user}` ,
     'Accept': 'application/json',
       'Content-Type': 'application/json'
     
   }), 
    body: JSON.stringify({
      name:name,
      image_id:image
    })
  }) 
 history.push('/')
  }
  function handleChange(e){
    setName(e.target.value)
  }
  console.log(name, image)
  return (
    <>
    <form onSubmit={handleSubmit} className="card" >
    <h1>Add place</h1>
    <input type="file" onChange={handleImagePost} accept="image/png, image/jpeg"/>
  <input name="place" onChange={handleChange} placeholder="Name of the place"type="text"/>
 
  <button type="submit">Add</button>
  <Link to="/">
  <button>Go back</button>
    </Link>  
    </form> 
    </>
  );
}

export default AddPlace;