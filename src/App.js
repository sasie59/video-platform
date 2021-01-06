import { useState } from "react";

import {
  Route,
  Switch,
  HashRouter as Router,
} from "react-router-dom";
import style from './App.module.scss';

import {
  HomePage,
  PlayPage,
  FavoritePage,
} from "pages";

function App() {

  const [favoriteVideo, setFavoriteVideo] = useState(JSON.parse(localStorage.getItem('favoriteVideo')) ?? {});

  const updateFavoriteVideo = favoriteVideo => {
    localStorage.setItem('favoriteVideo', JSON.stringify(favoriteVideo));
    setFavoriteVideo({...favoriteVideo});
  }

  return (
    <Router>
      <div className={style.App}>
        <Switch>
          <Route exact path="/play"><PlayPage /></Route>
          <Route exact path="/favorite">
            <FavoritePage {...{ favoriteVideo, updateFavoriteVideo }} />
          </Route>
          <Route exact path="/">
            <HomePage {...{ favoriteVideo, updateFavoriteVideo }} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
