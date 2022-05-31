import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "./Carousel.css";
import axios from 'axios';
import { img_300, noPicture } from "../../config/config";
import { Responsive } from '../../Customcss/Customcss';

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({id, media_type}) => {
  const[credits, setCredits] = useState([]);
  
  const fetchCredits = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    setCredits(data.cast);
  }

  useEffect(() => {
    fetchCredits();
  },[])
  
  const items = credits.map((cast) => (
      <div className="carouselItem">
        <img
          src={cast.profile_path ? `${img_300}/${cast.profile_path}` : noPicture}
          alt={cast.name ? cast.name : ''}
          className="carouselItemImg"
          onDragStart={handleDragStart}
        />
        <b className="carouselItemTxt">{cast.name ? cast.name : ''}</b>
      </div>
  ));

  return (
    <AliceCarousel 
      mouseTracking 
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={Responsive}
      items={items}
      autoPlay
    />
  );
}

export default Carousel;