import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Feedback,
  Game,
  Home,
  NotFound,
  Ranking,
  Settings,
} from './pages';
import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ width: 600 }} />
        <p>SUA VEZ</p>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/ranking" component={Ranking} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
