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
  return (
    <Router>
      <div className={style.App}>
        <Switch>
          <Route exact path="/favorite"><FavoritePage /></Route>
          <Route exact path="/play"><PlayPage /></Route>
          <Route exact path="/"><HomePage /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
