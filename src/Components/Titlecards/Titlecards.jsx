import React, { useEffect, useRef, useState } from 'react'
import './Titlecard.css'
import { Link } from 'react-router-dom';


function Titlecards({title,category}) {

const [apiData, setApiData]= useState([]);

  const cardsRef =useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTk0NDk3MmNhNzExZmE3Zjc5NTcxYmI0MWExZmI4ZiIsIm5iZiI6MTczMTIxMTc5OC4yNzc3MTgsInN1YiI6IjY2MTNmN2FiNTQzN2Y1MDE0YTdkNGMzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y4XNQ8c6VNzP4acV28VM3MivMOcaCRDAA24eoVwjbqI'
    }
  };
  
  
const handleWheel =(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft +=event.deltaY;
}
useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));


cardsRef.current.addEventListener('wheel',handleWheel);
},[])
  return (
    <div className='titlecard'>
      <h2>{title?title:"Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {
          apiData.map((card,index)=>{
              return <Link to={`/player/${card.id}`} className='card' key={index}>
                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path}/>
                <p>{card.original_title}</p>
              </Link>
          })
        }
      </div>
      </div>
  )
}

export default Titlecards