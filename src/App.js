import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Start from './pages/Start';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">

        <Router>
          <Switch>
            <Route exact path="/" component={Start} />
            <Route path="/settings" component={Settings} />
            <Route path="/feedback" component={Feedback} />
            <Route exact path="/play" component={Game} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
