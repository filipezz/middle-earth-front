import React, { useState, useRef } from 'react';
import {Link } from 'react-router-dom'
import history from '../../history'


function EditPlace({match}) {
  const [image, setImage]= useState()
  const [name, setName]= useState()

  const fileInput = useRef(null)

 async function handleImagePost(e){
    const data = new FormData()
   if(e.target.files.length===0){
     return
   }
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
    if(fileInput.current.files.length===0){
      await fetch(`http://localhost:3333/places/${match.params.place}`, {
    method: "PUT",
    headers:new Headers({
     'authorization': `Bearer ${match.params.user}` ,
     'Accept': 'application/json',
       'Content-Type': 'application/json'
     
   }), 
    body: JSON.stringify({
      name:name
    })
  }) 
  history.push('/')
  return
    }
  await fetch(`http://localhost:3333/places/${match.params.place}`, {
    method: "PUT",
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
  return (
    <>
    <form onSubmit={handleSubmit} className="card" >
    <h1>Edit place</h1>
    <input type="file" ref={fileInput} onChange={handleImagePost} accept="image/png, image/jpeg"/>
  <input name="place" onChange={handleChange} placeholder="Name of the place"type="text"/>
 
  <button type="submit">Edit</button>
  <Link to="/">
  <button>Go back</button>
    </Link>  
    </form> 
    </>
  );
}

export default EditPlace;