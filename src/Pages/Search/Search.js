import React , { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider , styled} from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination';
import './Search.css';
import axios from 'axios';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: "#fff",
    },
  },
});

const CssTextField = styled(TextField)({
  '& label': {
    color: 'white',
  },
  '& .MuiFilledInput-underline:before': {
    borderBottomColor: 'white',
  },
  '& .MuiFilledInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
  },
});

export default function Search() {
  const [ type , setType ] = useState(0);
  const [ page , setPage ] = useState(1);
  const [ content , setContent ] = useState([]);
  const [ numberOfPages , setNumberOfPages ] = useState(0);
  const [ searchText , setSearchText ] = useState('');
  const textRef = useRef();

  const typeHandler = ( e , newValue ) => {
    setType(newValue);
    setPage(1);
  }

  const searchButtonHandler = () => {
    setSearchText(textRef.current.value);
    fetchData();
  }

  const fetchData = async () => {
    if(textRef.current.value){
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${textRef.current.value}&page=${page}&include_adult=false`);
      setContent(data.results);
      setNumberOfPages(data.total_pages);
    }
  }

  useEffect(() => {
    window.scroll(0,0);
    fetchData();
  } , [ page , type ]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <span className="pageTitle">Search</span>
        <div className="searchContainer">
          <CssTextField id="filled-basic" fullWidth label="Search" variant="filled" inputRef={textRef} />
          <Button variant="contained" className="searchButton" sx={{ marginLeft: 1 }} onClick={searchButtonHandler} >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs sx={{paddingBottom: "10px"}} value={type} textColor="primary" indicatorColor="primary" onChange={typeHandler}>
          <Tab sx={{ width: "50%" , color: "white"}} label="SEARCH MOVIES" />
          <Tab sx={{ width: "50%" , color: "white" }} label="SEARCH TV SERIES" />
        </Tabs>
        <div className="search">
          {
            content && content.map((obj) =>
              <SingleContent
                key={obj.id}
                id={obj.id}
                poster={obj.poster_path}
                title={obj.title || obj.name}
                date={obj.first_air_date || obj.release_date}
                media_type={ type ? 'tv' : 'movie' }
                vote_average={obj.vote_average}
              />
            )
          }
          { searchText &&
            !content.length &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
          }
        </div>
        {numberOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={ numberOfPages > 500 ? 500 : numberOfPages } />}
      </ThemeProvider>
    </div>
  )
}
