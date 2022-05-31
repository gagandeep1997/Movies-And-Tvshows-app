import React from 'react'
import Badge from '@mui/material/Badge';
import "./SingleContent.css";
import { img_300 , unavailable } from '../../config/config';
import { ThemeProvider } from '@mui/material/styles';
import ContentModal from '../ContentModal/ContentModal';
import { theme } from '../../Customcss/Customcss';

export default function SingleContent({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
}) {
  return (
    <ThemeProvider theme={theme}>
      <ContentModal media_type={media_type} id={id}>
        <Badge 
          badgeContent={vote_average} 
          color={vote_average > 6 ? "primary" : "secondary"} 
        />
        <div className="img-container">
          <img className="poster" src={ poster ? `${img_300}/${poster}` : unavailable} alt={title} />
        </div>
        <b className="title">{title}</b>
        <span className="subtitle">
            { media_type === "tv" ? "Tv Series" : "Movie" }
            <span className="subtitle">
                {date}
            </span>
        </span>
      </ContentModal>
    </ThemeProvider>
  )
}
