import React , { useEffect , useState } from 'react';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination';
import './Trending.css';

export default function Trending() {
  const [ content , setContent ] = useState([]);
  const [ Page , setPage ] = useState(1);
  
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${Page}&include_adult=false`
    );
    setContent(data.results);
  } 
  
  useEffect(() => {
    fetchTrending();
  },[ Page ]);

  return (
    <div>
        <span className="pageTitle">Trending</span>
        <div className="trending">
          {
            content && content.map((obj) =>
              <SingleContent
                key={obj.id}
                id={obj.id}
                poster={obj.poster_path}
                title={obj.title || obj.name}
                date={obj.first_air_date || obj.release_date}
                media_type={obj.media_type}
                vote_average={obj.vote_average}
              />
            )
          }
        </div>
        <CustomPagination setPage={setPage} />
    </div>
  )
}
