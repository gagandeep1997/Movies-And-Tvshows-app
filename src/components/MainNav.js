import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TvIcon from '@mui/icons-material/Tv';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from "@mui/icons-material/Search";
import { bottomNavigation } from '../Customcss/Customcss';

const SimpleBottomNavigation = () => {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  
  useEffect(() => {
    if (value === 0){
      history.push('/');
    } else if (value === 1){
      history.push('/movies');
    } else if (value === 2){
      history.push('/series');
    } else if (value === 3){
      history.push('/search');
    }
  },[ value , history ]);

  return (
    
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={bottomNavigation}>
      <BottomNavigationAction sx={{ color: "white" }} label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction sx={{ color: "white" }} label="Movies" icon={<MovieIcon />} />
      <BottomNavigationAction sx={{ color: "white" }} label="Tv Series" icon={<TvIcon />} />
      <BottomNavigationAction sx={{ color: "white" }} label="Search" icon={<SearchIcon />} />
    </BottomNavigation>
  );
}

export default SimpleBottomNavigation;