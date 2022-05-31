import React , { useEffect , useState } from 'react';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination';
import Genres from '../../components/Genres/Genres';
import useGenres from '../../hooks/useGenres';
import './Series.css';

export default function Series() {
  const [ content , setContent ] = useState([]);
  const [ Page , setPage ] = useState(1);
  const [ genre , setGenre ] = useState([]);
  const [ selectedGenre , setSelectedGenre ] = useState([]);
  const [ numberOfPages , setNumberOfPages ] = useState(0);
  const moviesGenresFilter = useGenres(selectedGenre); //custom hooks
  
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${Page}&with_watch_monetization_types=flatrate&with_genres=${moviesGenresFilter}`
    );
    setContent(data.results);
    setNumberOfPages(data.total_pages);
  } 
  
  useEffect(() => {
    fetchTrending();
  },[ Page , moviesGenresFilter ]);

  return (
    <div>
        <span className="pageTitle">Tv Series</span>
        <Genres
          type='tv'
          genre={genre} 
          setGenre={setGenre} 
          selectedGenre={selectedGenre} 
          setSelectedGenre={setSelectedGenre}
          setPage={setPage}
        />
        <div className="tv">
          {
            content && content.map((obj) =>
              <SingleContent
                key={obj.id}
                id={obj.id}
                poster={obj.poster_path}
                title={obj.title || obj.name}
                date={obj.first_air_date || obj.release_date}
                media_type="tv"
                vote_average={obj.vote_average}
              />
            )
          }
        </div>
        {numberOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={ numberOfPages > 500 ? 500 : numberOfPages } />}
    </div>
  )
}