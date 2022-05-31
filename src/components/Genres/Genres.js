import React , { useEffect } from 'react';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import './Genres.css';
import { customGenreCss, customSelectedGenreCss } from '../../Customcss/Customcss';


export default function Genres({ type , genre , setGenre , selectedGenre , setSelectedGenre , setPage }) {
  
  const handleClick = (item) => {
    setGenre(genre.filter((genre) => {
      return genre.id !== item.id;
    }));
    setSelectedGenre([...selectedGenre,item]);
    setPage(1);
  }

  const handleDelete = (item) => {
    setSelectedGenre(selectedGenre.filter((genre) => {
      return genre.id !== item.id;
    }));
    setGenre([...genre,item]);
    setPage(1);
  }

  const fetchGenres = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    setGenre(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenre([]);
    }
  }, []);
  
  return (
    <div className="genre">
      { selectedGenre && selectedGenre.map((item) => (
        <Chip key={item.id} label={item.name} color="primary" sx={customSelectedGenreCss} size="small" clickable onDelete={() => handleDelete(item)} />
      )) }
      { genre && genre.map((item) => (
        <Chip key={item.id} label={item.name} sx={customGenreCss} size="small" clickable onClick={() => handleClick(item)} />
      )) }
    </div>
  )
}
