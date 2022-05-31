import React , { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from '../Carousel/Carousel';
import { modal , backdrop } from '../../Customcss/Customcss';
import './ContentModal.css';

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchContent = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    setContent(data);
  }

  const fetchVideo = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    setVideo(data.results[0] ? data.results[0].key : '');
  }

  useEffect(() => {
    fetchContent();
    fetchVideo();
  },[])
  
  return (
    <>
      <div className="media" onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: backdrop
        }}
        sx={modal}
      >
        <Fade in={open}>
            {content && (
                <div className="modalpaper">
                    <div className="ContentModal">
                        <img 
                          src={content.poster_path ? `${img_500}/${content.poster_path}`: unavailable } 
                          alt={content.name || content.title}
                          className="Content_portrait"
                        />
                        <img 
                          src={content.poster_path ? `${img_500}/${content.backdrop_path}`: unavailableLandscape } 
                          alt={content.name || content.title}
                          className="Content_landscape"
                        />
                        <div className="ContentModal__about">
                            <span className="ContentModal__title">
                                {content.name || content.title} (
                                    {(content.first_air_date || content.release_date || "-----").substring(0, 4)}
                                )
                            </span>
                            {content.tagline && (
                                <i className="tagline">{content.tagline}</i>
                            )}

                            <span className="ContentModal__description">
                                {content.overview}
                            </span>

                            <div>
                                <Carousel id={id} media_type={media_type} />
                            </div>

                            <Button
                                variant="contained"
                                startIcon={<YouTubeIcon />}
                                color="secondary"
                                target="__blank"
                                href={`https://www.youtube.com/watch?v=${video}`}
                            >
                                Watch the Trailer
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Fade>
      </Modal>
    </>
  );
}
