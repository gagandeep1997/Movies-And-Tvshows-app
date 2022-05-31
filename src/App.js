import React from 'react';
import { Container } from '@mui/material';
import { Route , Switch } from 'react-router-dom';
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import './App.css';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';

const App = () => {
  return (
    <>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" exact>
              <Trending />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/series">
              <Series />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </>
  );
}

export default App;
