import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id}= useParams();

  const navigate =useNavigate();

  const [apidata, setApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTk0NDk3MmNhNzExZmE3Zjc5NTcxYmI0MWExZmI4ZiIsIm5iZiI6MTczMTIxMTc5OC4yNzc3MTgsInN1YiI6IjY2MTNmN2FiNTQzN2Y1MDE0YTdkNGMzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y4XNQ8c6VNzP4acV28VM3MivMOcaCRDAA24eoVwjbqI'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));

  },[])
 

  return (
    <div className='player'>
     <img src={back_arrow} onClick={()=>{navigate(-2)}}/>
     <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apidata.key}` }title='Trailer' frameBorder='0' allowFullScreen></iframe>
     <div className="player-info">
      <p>{apidata.published_at .slice(0,10)}</p>
      <p>{apidata.name}</p>
      <p>{apidata.type}</p>
     </div>
      </div>
  )
}

export default Player