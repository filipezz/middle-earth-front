import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'


import './styles.css'
import heart from './heart.svg'

function Timeline(){
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
 


  useEffect(()=>{
    async function loadPlaces(){
      const response = await fetch('http://localhost:3333/browse')
      const data = await response.json()
      setPlaces(data)
      setLoading(false)
    }
    
    loadPlaces()
    
  },[])
  async function handleLike(place_id){
  
  try{
  
    await fetch(`http://localhost:3333/places/${place_id}/like`, {method:'PUT'})
    async function loadPlaces(){
      const response = await fetch('http://localhost:3333/browse')
      const data = await response.json()
      setPlaces(data)
    }
    loadPlaces()
  }catch(err){
    throw err
  }
  }
  
  return (
    <>
    <header>
     
      <Link className="header" to="/login">
        <p>

      Login
        </p>
      </Link>
      <Link  className="header"to="/register">
    <p>
    Sign in 
      </p> 
      </Link>
    </header>
    <div className="content" >
      {loading? <h1>Loading...</h1>
       :
       <>
      {places.length===0? <h1>No places to browse yet</h1> 
      :
      <>
       {places?.map((place)=>(
        <div className="place-container" key={place.id}>
        <img src={place.image_url} alt=""/>
        <div className="text">
        

      <strong>{place.name}</strong>
      <button type="button" onClick={()=>handleLike(place.id)}>Like</button>
      <span className="like-count"><img className="heart" src={heart} alt=""/>{place.likes_count}</span>
      <span className="posted-by">Posted by {place.user_name}</span>
        </div>
      </div>
      ))} 
      </>
      }
      </>
       }
      
    </div>
    </>
  )
}

export default Timeline;
